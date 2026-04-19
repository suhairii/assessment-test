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

export const FinalSection = () => {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext();
  const errorClass = "text-[11px] text-destructive mt-1 font-medium";
  const cvFile = watch("finalSection.cvFile");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Untuk simulasi, kita simpan nama filenya saja
      // Dalam produksi, Anda bisa mengupload ke server/cloud storage di sini
      setValue("finalSection.cvFile", file.name);
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-l-4 border-blue-600 pl-4">
        <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">{FORM_STATEMENTS.finalDeclaration.title}</h2>
        <p className="text-sm text-slate-500 mt-1">{FORM_STATEMENTS.finalDeclaration.subtitle}</p>
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
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500" />
                  <p className="text-sm text-slate-600 font-medium">
                    {cvFile ? `Selected: ${cvFile}` : "Click to upload your CV"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX (Max 2MB)</p>
                </div>
              </Label>
            </div>
            {cvFile && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setValue("finalSection.cvFile", "")}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <Card className="bg-blue-50/50 border-blue-100 shadow-sm overflow-hidden">
        <CardContent className="p-8 flex items-start gap-4">
          <Controller
            name="finalSection.declaration"
            control={control}
            render={({ field }) => (
              <Checkbox 
                id="declaration" 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                className="mt-1"
              />
            )}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="declaration" className="text-sm font-medium leading-relaxed cursor-pointer select-none text-slate-700">
              {FORM_STATEMENTS.finalDeclaration.agreement.id}
            </Label>
            <p className="text-xs italic text-slate-500 mt-2">
              {FORM_STATEMENTS.finalDeclaration.agreement.en}
            </p>
            {errors.finalSection?.declaration && <p className="text-sm text-destructive font-bold italic mt-2">{errors.finalSection.declaration.message as string}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
