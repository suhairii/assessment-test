import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Button } from "@/src/components/application-form/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/application-form/ui/card";

export const FamilyDataSection = () => {
  const { register, control, watch } = useFormContext();
  const martialStatus = watch("personalData.status");
  const errorClass = "text-[10px] text-destructive mt-1 font-medium";

  const { fields: siblings, append: appendSibling, remove: removeSibling } = useFieldArray({ control, name: "familyData.siblings" });
  const { fields: children, append: appendChild, remove: removeChild } = useFieldArray({ control, name: "familyData.children" });

  const FamilyMemberForm = ({ label, path }: { label: string; path: string }) => {
    const { formState: { errors } } = useFormContext();
    const getError = (path: string) => path.split('.').reduce((obj, key) => obj?.[key], errors as any);

    const nameError = getError(`${path}.name`);
    const dobError = getError(`${path}.placeDateOfBirth`);
    const occError = getError(`${path}.occupation`);

    return (
      <Card className="shadow-sm border-slate-100">
        <CardHeader className="py-4 bg-slate-50/50">
          <CardTitle className="text-sm font-semibold text-slate-800">{label}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Name / Nama</Label>
            <Input {...register(`${path}.name`)} className={nameError ? "border-destructive" : ""} />
            {nameError && <p className={errorClass}>{nameError.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>DOB / Tempat, Tgl Lahir</Label>
            <Input {...register(`${path}.placeDateOfBirth`)} className={dobError ? "border-destructive" : ""} />
            {dobError && <p className={errorClass}>{dobError.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Occupation / Pekerjaan</Label>
            <Input {...register(`${path}.occupation`)} className={occError ? "border-destructive" : ""} />
            {occError && <p className={errorClass}>{occError.message}</p>}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-10">
      <div className="border-l-4 border-blue-600 pl-4 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 leading-none">B. Data Keluarga / Family Background</h2>
        <p className="text-sm text-slate-500 mt-2">Provide details about your parents and spouse/children if applicable.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FamilyMemberForm label="Father / Ayah" path="familyData.father" />
        <FamilyMemberForm label="Mother / Ibu" path="familyData.mother" />
        {martialStatus === "Married" && <FamilyMemberForm label="Husband/Wife / Suami/Istri" path="familyData.spouse" />}
      </div>

      {/* Siblings */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-800">Siblings / Saudara Kandung</h3>
          <Button type="button" variant="ghost" size="sm" onClick={() => appendSibling({ name: "", placeDateOfBirth: "", occupation: "" })} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Sibling
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {siblings.map((field, index) => (
            <div key={field.id} className="relative group">
              <FamilyMemberForm label={`Sibling ${index + 1}`} path={`familyData.siblings.${index}`} />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeSibling(index)} className="absolute top-2 right-2 text-slate-300 hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Children */}
      {(martialStatus === "Married" || martialStatus === "Widow" || martialStatus === "Widower") && (
        <div className="space-y-6 pt-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-800">Children / Anak</h3>
            <Button type="button" variant="ghost" size="sm" onClick={() => appendChild({ name: "", placeDateOfBirth: "", occupation: "" })} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Child
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {children.map((field, index) => (
              <div key={field.id} className="relative group">
                <FamilyMemberForm label={`Child ${index + 1}`} path={`familyData.children.${index}`} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeChild(index)} className="absolute top-2 right-2 text-slate-300 hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
