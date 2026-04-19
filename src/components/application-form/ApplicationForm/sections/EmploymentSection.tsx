import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, FileCheck } from "lucide-react";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Button } from "@/src/components/application-form/ui/button";
import { Textarea } from "@/src/components/application-form/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/application-form/ui/card";

export const EmploymentSection = () => {
  const { register, control, setValue, watch } = useFormContext();
  const { fields: jobs } = useFieldArray({ control, name: "employmentHistory" });
  const { fields: social, append: appendSocial, remove: removeSocial } = useFieldArray({ control, name: "socialActivities" });

  const employmentData = watch("employmentHistory");

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`employmentHistory.${index}.paklaringFile`, file.name);
    }
  };

  return (
    <div className="space-y-20">
      {/* SECTION F: EMPLOYMENT HISTORY */}
      <div className="space-y-10">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">F. Riwayat Pekerjaan / Employment History</h2>
          <p className="text-sm text-slate-500 mt-1">Provide your last 3 job positions starting from the most recent.</p>
        </div>

        <div className="space-y-12">
          {jobs.map((field, index) => (
            <Card key={field.id} className="shadow-sm border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
              <CardHeader className="py-4 bg-slate-50/50 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black italic">
                    0{index + 1}
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-widest italic underline decoration-blue-600 underline-offset-4">
                    {index === 0 ? "Current or Last Position" : `Previous Position ${index + 1}`}
                  </CardTitle>
                </div>
                
                {employmentData?.[index]?.paklaringFile && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                    <FileCheck className="w-3 h-3" />
                    PAKLARING ATTACHED
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Company Name / Nama Perusahaan</Label>
                    <Input {...register(`employmentHistory.${index}.companyName`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Type / Jenis Usaha</Label>
                    <Input {...register(`employmentHistory.${index}.businessType`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Job Title / Jabatan</Label>
                    <Input {...register(`employmentHistory.${index}.jobTitle`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Salary / Gaji</Label>
                    <Input {...register(`employmentHistory.${index}.salary`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Office Phone / No. Telp</Label>
                    <Input {...register(`employmentHistory.${index}.officePhone`)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start / Mulai</Label>
                      <Input {...register(`employmentHistory.${index}.startWorking`)} placeholder="MM/YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label>End / Berhenti</Label>
                      <Input {...register(`employmentHistory.${index}.resigned`)} placeholder="MM/YYYY" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Reason for Resignation / Alasan Berhenti</Label>
                    <Input {...register(`employmentHistory.${index}.reasonForResignation`)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="space-y-2">
                    <Label>Line Supervisor Name / Nama Atasan</Label>
                    <Input {...register(`employmentHistory.${index}.supervisorName`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Supervisor Job Title / Jabatan Atasan</Label>
                    <Input {...register(`employmentHistory.${index}.supervisorTitle`)} />
                  </div>
                  <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                      <Label>Reporting Staff Count / Jumlah Bawahan</Label>
                      <Input {...register(`employmentHistory.${index}.reportingCount`)} placeholder="e.g. 5" />
                    </div>
                    
                    <div className="flex-1 w-full space-y-2">
                      <Label className="text-blue-600 font-bold">Certificate of Employment / Paklaring (Optional)</Label>
                      <div className="relative group">
                        <Input 
                          id={`paklaring-${index}`}
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(index, e)}
                        />
                        <Label 
                          htmlFor={`paklaring-${index}`}
                          className="flex items-center justify-center w-full h-10 border border-dashed border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all text-[11px] font-medium text-slate-500"
                        >
                          <Upload className="w-3.5 h-3.5 mr-2 text-blue-500" />
                          {employmentData?.[index]?.paklaringFile ? employmentData[index].paklaringFile : "Upload Paklaring"}
                        </Label>
                      </div>
                      {employmentData?.[index]?.paklaringFile && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setValue(`employmentHistory.${index}.paklaringFile`, "")}
                          className="h-6 text-[10px] text-red-500 hover:text-red-700 p-0"
                        >
                          Remove file
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Job Description / Deskripsi Tugas</Label>
                  <Textarea {...register(`employmentHistory.${index}.jobDesc`)} rows={4} placeholder="Explain your key responsibilities..." />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION G: SOCIAL ACTIVITY */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">G. Aktivitas Sosial / Social Activity</h2>
            <p className="text-sm text-slate-500 mt-1">Organizational experiences or social activities (Max 3).</p>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={() => appendSocial({ orgName: "", activity: "", function: "", year: "" })} 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {social.map((field, index) => (
            <Card key={field.id} className="relative shadow-sm border-slate-100">
              <Button 
                type="button" 
                variant="ghost"
                size="icon"
                onClick={() => removeSocial(index)} 
                className="absolute top-2 right-2 text-slate-300 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <CardContent className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 space-y-2">
                  <Label>Organization Name</Label>
                  <Input {...register(`socialActivities.${index}.orgName`)} />
                </div>
                <div className="space-y-2">
                  <Label>Activity</Label>
                  <Input {...register(`socialActivities.${index}.activity`)} />
                </div>
                <div className="space-y-2">
                  <Label>Function</Label>
                  <Input {...register(`socialActivities.${index}.function`)} />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input {...register(`socialActivities.${index}.year`)} />
                </div>
              </CardContent>
            </Card>
          ))}
          {social.length === 0 && (
            <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 text-sm">
              No social activities added. Click "ADD ACTIVITY" if you have organizational experience.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
