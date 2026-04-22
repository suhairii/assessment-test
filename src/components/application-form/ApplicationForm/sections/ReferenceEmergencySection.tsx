import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Button } from "@/src/components/application-form/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/application-form/ui/card";

export const ReferenceEmergencySection = () => {
  const { register, control } = useFormContext();
  
  // Dynamic References
  const { fields: refs, append: appendRef, remove: removeRef } = useFieldArray({ control, name: "references" });
  
  // Dynamic Emergency Contacts
  const { fields: emergencies, append: appendEmergency, remove: removeEmergency } = useFieldArray({ control, name: "emergencyContacts" });

  return (
    <div className="space-y-24">
      {/* I. REFERENCES */}
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-black pl-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">I. Referensi / References</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Professional references from former bosses or managers.</p>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => appendRef({ name: "", relationship: "", jobTitle: "", companyName: "", mobilePhone: "" })} 
            className="rounded-full text-[10px] uppercase tracking-widest h-8 px-4 border-gray-200"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Reference
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {refs.map((field, index) => (
            <Card key={field.id} className="relative shadow-sm border-gray-100 bg-gray-50/50 group hover:border-gray-200 transition-all">
              <Button 
                type="button" 
                variant="ghost"
                size="icon"
                onClick={() => removeRef(index)} 
                className={`absolute top-2 right-2 text-gray-300 hover:text-red-600 ${refs.length <= 1 ? 'hidden' : 'block'}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              
              <CardContent className="pt-10 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reference Entry</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Full Name / Nama</Label>
                  <Input {...register(`references.${index}.name`)} />
                </div>
                <div className="space-y-2">
                  <Label>Relationship / Hubungan</Label>
                  <Input {...register(`references.${index}.relationship`)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title / Jabatan</Label>
                    <Input {...register(`references.${index}.jobTitle`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Company / Perusahaan</Label>
                    <Input {...register(`references.${index}.companyName`)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Mobile Phone / No. HP</Label>
                  <Input {...register(`references.${index}.mobilePhone`)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* J. EMERGENCY CONTACTS */}
      <div className="space-y-12 pt-16 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-black pl-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">J. Kontak Darurat / Emergency Contacts</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Person that can be contacted in case of emergency.</p>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => appendEmergency({ name: "", relationship: "", mobilePhone: "" })} 
            className="rounded-full text-[10px] uppercase tracking-widest h-8 px-4 border-gray-200"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Contact
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencies.map((field, index) => (
            <Card key={field.id} className="relative shadow-sm border-gray-100 bg-gray-50/50 group hover:border-gray-200 transition-all">
              <Button 
                type="button" 
                variant="ghost"
                size="icon"
                onClick={() => removeEmergency(index)} 
                className={`absolute top-2 right-2 text-gray-300 hover:text-red-600 ${emergencies.length <= 1 ? 'hidden' : 'block'}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <CardContent className="pt-10 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Emergency Contact</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input {...register(`emergencyContacts.${index}.name`)} />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input {...register(`emergencyContacts.${index}.relationship`)} />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Phone</Label>
                  <Input {...register(`emergencyContacts.${index}.mobilePhone`)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
