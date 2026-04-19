"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";
import { ApplicationFormSchema, ApplicationFormData } from "@/src/lib/application-form-schema";
import { FIELD_LABELS, STEPS_METADATA as STEPS } from "@/src/lib/application-form-constants";
import { Button } from "@/src/components/application-form/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/src/components/application-form/ui/sonner";
import { Progress } from "@/src/components/application-form/ui/progress";

// Import Sections
import { PersonalDataSection } from "./sections/PersonalDataSection";
import { FamilyDataSection } from "./sections/FamilyDataSection";
import { EducationSection } from "./sections/EducationSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { ReferenceEmergencySection } from "./sections/ReferenceEmergencySection";
import { FinalSection } from "./sections/FinalSection";

interface ApplicationFormProps {
  token?: string | null;
}

export default function ApplicationForm({ token }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema),
    mode: "onBlur",
    defaultValues: {
      personalData: { gender: "Laki-laki/Male", status: "Single" },
      familyData: { siblings: [], children: [] },
      courses: [],
      languages: [],
      employmentHistory: [{}, {}, {}],
      references: [{}],
      emergencyContacts: [{}, {}],
      finalSection: { declaration: false },
    },
  });

  const { handleSubmit, trigger, reset, watch, formState: { isSubmitting, errors } } = methods;

  // Watch for changes to auto-save to localStorage
  const formData = watch();
  useEffect(() => {
    const saveToLocal = () => {
      try {
        localStorage.setItem("application_form_draft", JSON.stringify(formData));
        localStorage.setItem("application_form_step", currentStep.toString());
      } catch (e) {
        console.error("Failed to save draft to local storage", e);
      }
    };
    saveToLocal();
  }, [formData, currentStep]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("application_form_draft");
    const savedStep = localStorage.getItem("application_form_step");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
        if (savedStep) setCurrentStep(parseInt(savedStep));
      } catch (e) {
        console.error("Failed to load draft from local storage", e);
      }
    }
  }, [reset]);

  const saveProgressManual = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Draft saved successfully to your browser!");
    }, 500);
  };

  const fillDummyData = () => {
    const today = new Date().toISOString().split('T')[0];
    const dummy: ApplicationFormData = {
      personalData: {
        appliedPosition: "Expert Next.js Developer", vacancySource: "Direct", fullName: "Test Candidate",
        gender: "Laki-laki/Male", nickname: "Tester", bloodType: "B", placeOfBirth: "Jakarta",
        dateOfBirth: "1990-01-01", religion: "Islam", ktpNo: "1234567890123456",
        ktpValidUntil: "2030-01-01", email: "test@example.com", mobilePhone: "08123456789",
        currentAddress: "Jakarta", ktpAddress: "Jakarta", status: "Single",
      },
      familyData: {
        father: { name: "Father Name", placeDateOfBirth: "Jakarta, 1960", occupation: "Retired" },
        mother: { name: "Mother Name", placeDateOfBirth: "Jakarta, 1965", occupation: "Housewife" },
        siblings: [], children: []
      },
      education: {
        sd: { institution: "SD 01", major: "General", graduationYear: "2000", gpa: "3.0" },
        sltp: { institution: "SMP 01", major: "General", graduationYear: "2003", gpa: "3.0" },
        slta: { institution: "SMA 01", major: "IPA", graduationYear: "2006", gpa: "3.0" },
      },
      courses: [], languages: [],
      employmentHistory: Array(3).fill({ 
        companyName: "Company", jobTitle: "Dev", salary: "10M", officePhone: "021", 
        startWorking: "2010", resigned: "2020", reasonForResignation: "Resign",
        jobDesc: "Dev", businessType: "IT", supervisorName: "Boss", 
        supervisorTitle: "CEO", reportingCount: "0" 
      }),
      socialActivities: [],
      references: [
        { name: "Reference 1", relationship: "Manager", jobTitle: "Lead", companyName: "Co", mobilePhone: "0811" }
      ],
      emergencyContacts: [
        { name: "Emergency 1", relationship: "Brother", mobilePhone: "0811" },
        { name: "Emergency 2", relationship: "Sister", mobilePhone: "0822" }
      ],
      finalSection: { 
        expectedSalary: "15.000.000", 
        availability: "Immediately", 
        expectedJoinDate: today, 
        declaration: true 
      }
    };
    reset(dummy);
    toast.info("Dummy data loaded!");
  };

  const next = async () => {
    const fields = STEPS[currentStep].fields as any;
    const isValid = await trigger(fields, { shouldFocus: true });
    
    if (!isValid) {
      toast.error("Please fix the errors before continuing.");
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Flatten data for database if needed, or send as is
      // We will add the token to identify and mark it as used
      const payload = {
        ...data,
        token: token,
        // Map top level fields for dashboard search/view
        fullName: data.personalData.fullName,
        appliedPosition: data.personalData.appliedPosition,
      };

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.removeItem("application_form_draft");
        localStorage.removeItem("application_form_step");
        toast.success("Application Submitted Successfully!");
        setTimeout(() => {
          window.location.href = "/submit-success";
        }, 1500);
      } else {
        throw new Error(responseData.error || "Failed to submit application");
      }
    } catch (error: any) {
      toast.error(`Submission Failed: ${error.message}`);
    }
  };

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      <Toaster position="top-center" richColors />
      
      <div className="mb-12 sticky top-0 bg-white/95 backdrop-blur-sm z-20 py-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight italic uppercase">Application Form</h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Step {currentStep + 1} of {STEPS.length}: <span className="text-blue-600">{STEPS[currentStep].title}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={saveProgressManual} disabled={isSaving} className="text-blue-600 border-blue-100 hover:bg-blue-50">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button variant="ghost" size="sm" onClick={fillDummyData} className="text-slate-400 hover:text-slate-600">
              Fill Dummy
            </Button>
          </div>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 pb-20">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 0 && (
              <div className="space-y-20">
                <PersonalDataSection />
                <div className="border-t border-slate-100 pt-20">
                  <FamilyDataSection />
                </div>
              </div>
            )}
            {currentStep === 1 && <EducationSection />}
            {currentStep === 2 && <EmploymentSection />}
            {currentStep === 3 && <ReferenceEmergencySection />}
            {currentStep === 4 && <FinalSection />}
          </div>

          <div className="flex w-full justify-between items-center pt-10 border-t border-slate-100 mt-10">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => setCurrentStep(s => s - 1)} 
              className={currentStep === 0 ? 'invisible' : 'visible text-slate-500'}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button 
              type="button" 
              onClick={currentStep < STEPS.length - 1 ? next : handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
            >
              {isSubmitting ? "Submitting..." : currentStep < STEPS.length - 1 ? (
                <>Continue <ChevronRight className="w-4 h-4 ml-2" /></>
              ) : "Finalize & Submit"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
