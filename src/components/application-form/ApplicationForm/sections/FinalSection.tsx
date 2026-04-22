import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FORM_STATEMENTS, AVAILABILITY_OPTIONS } from "@/src/lib/application-form-constants";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Checkbox } from "@/src/components/application-form/ui/checkbox";
import { Button } from "@/src/components/application-form/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/application-form/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/src/components/application-form/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const FinalSection = () => {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext();
  const errorClass = "text-[11px] text-destructive mt-1 font-medium";
  const cvFile = watch("finalSection.cvFile");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit.");
        return;
      }

      const toastId = toast.loading("Uploading CV...");
      try {
        const response = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        });
        
        const blob = await response.json();
        if (blob.url) {
          setValue("finalSection.cvFile", blob.url); 
          toast.success("CV uploaded successfully", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload CV", { id: toastId });
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-l-4 border-black pl-6">
        <h2 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">{FORM_STATEMENTS.finalDeclaration.title}</h2>
        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">{FORM_STATEMENTS.finalDeclaration.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="expectedSalary">Expected Salary-Gross (Rp) / Gaji yang Diharapkan</Label>
          <Input id="expectedSalary" {...register("finalSection.expectedSalary")} placeholder="e.g. 10.000.000" className={errors.finalSection?.expectedSalary ? "border-destructive" : ""} />
          {errors.finalSection?.expectedSalary && <p className={errorClass}>{errors.finalSection.expectedSalary.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedJoinDate">Expected Join Date / Tanggal Siap Bergabung</Label>
          <Input id="expectedJoinDate" type="date" {...register("finalSection.expectedJoinDate")} className={errors.finalSection?.expectedJoinDate ? "border-destructive" : ""} />
          {errors.finalSection?.expectedJoinDate && <p className={errorClass}>{errors.finalSection.expectedJoinDate.message as string}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>Availability Notice / Keterangan Kebersediaan</Label>
          <Controller
            name="finalSection.availability"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.finalSection?.availability ? "border-destructive" : ""}>
                  <SelectValue placeholder="Pilih Kebersediaan / Select Availability" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.finalSection?.availability && <p className={errorClass}>{errors.finalSection.availability.message as string}</p>}
        </div>

        <div className="md:col-span-2 space-y-4">
          <Label>Upload CV / Curriculum Vitae (Terupdate)</Label>
          <div className="flex items-center gap-4">
            <div className="relative group flex-1">
              <Input 
                id="cv-upload" 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Label 
                htmlFor="cv-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-black transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <Upload className="w-8 h-8 text-gray-300 mb-2 group-hover:text-black transition-colors" />
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
                    {cvFile ? `Selected: ${cvFile}` : "Click to upload your CV"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">PDF, DOC, DOCX (Max 2MB)</p>
                </div>
              </Label>
            </div>
            {cvFile && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setValue("finalSection.cvFile", "")}
                className="text-red-600 hover:text-red-700 font-bold uppercase tracking-widest text-[10px]"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <Card className="bg-black text-white border-none shadow-xl shadow-gray-200 overflow-hidden">
        <CardContent className="p-10 flex items-start gap-6">
          <Controller
            name="finalSection.declaration"
            control={control}
            render={({ field }) => (
              <Checkbox 
                id="declaration" 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                className="mt-1 border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
            )}
          />
          <div className="grid gap-3 leading-none">
            <Label htmlFor="declaration" className="text-sm font-bold leading-relaxed cursor-pointer select-none text-white/90">
              {FORM_STATEMENTS.finalDeclaration.agreement.id}
            </Label>
            <p className="text-xs italic text-white/50 leading-relaxed">
              {FORM_STATEMENTS.finalDeclaration.agreement.en}
            </p>
            {errors.finalSection?.declaration && <p className="text-xs text-red-400 font-black uppercase tracking-widest mt-4">{errors.finalSection.declaration.message as string}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
