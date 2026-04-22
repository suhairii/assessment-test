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
      familyData: { 
        siblings: [
          { name: "", placeDateOfBirth: "", occupation: "" },
          { name: "", placeDateOfBirth: "", occupation: "" }
        ], 
        children: [] 
      },
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

  const next = async () => {
    const fields = STEPS[currentStep].fields as any;
    const isValid = await trigger(fields, { shouldFocus: true });
    
    if (!isValid) {
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
      
      <div className="mb-16 sticky top-0 bg-white/95 backdrop-blur-sm z-20 py-8 border-b-2 border-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">Application Form</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-3 font-bold uppercase tracking-widest">
              Aptitude Assessment System / Step {currentStep + 1} of {STEPS.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={saveProgressManual} disabled={isSaving} className="rounded-full border-gray-200 text-gray-400 hover:text-black hover:border-black">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">{STEPS[currentStep].title}</span>
                <span className="text-[10px] font-mono text-gray-400">{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-1.5" />
        </div>
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

          <div className="flex w-full justify-between items-center pt-10 border-t border-gray-100 mt-20">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => setCurrentStep(s => s - 1)} 
              className={currentStep === 0 ? 'invisible' : 'visible text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-black'}
            >
              <ChevronLeft className="w-3 h-3 mr-2" /> Previous Step
            </Button>
            <Button 
              type="button" 
              onClick={currentStep < STEPS.length - 1 ? next : handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="rounded-full px-12 bg-black text-white hover:bg-gray-800 shadow-xl shadow-gray-200 uppercase tracking-widest text-xs font-black"
            >
              {isSubmitting ? "Processing..." : currentStep < STEPS.length - 1 ? (
                <>Next Section <ChevronRight className="w-4 h-4 ml-2" /></>
              ) : "Submit Application"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
