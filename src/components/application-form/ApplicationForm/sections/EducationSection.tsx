import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Button } from "@/src/components/application-form/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/src/components/application-form/ui/card";

export const EducationSection = () => {
  const { register, control } = useFormContext();
  const { fields: courses, append: appendCourse, remove: removeCourse } = useFieldArray({ control, name: "courses" });
  const { fields: languages, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "languages" });

  const errorClass = "text-[10px] text-destructive mt-1 font-medium";

  const EduForm = ({ label, path, required = false }: { label: string; path: string; required?: boolean }) => {
    const { formState: { errors } } = useFormContext();
    const getError = (path: string) => path.split('.').reduce((obj, key) => obj?.[key], errors as any);

    const instError = getError(`${path}.institution`);
    const majorError = getError(`${path}.major`);
    const yearError = getError(`${path}.graduationYear`);

    return (
      <Card className="shadow-sm border-slate-100">
        <CardHeader className="py-4 bg-slate-50/50 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-800">{label}</CardTitle>
          {required && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Required</span>}
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input {...register(`${path}.institution`)} className={instError ? "border-destructive" : ""} />
            {instError && <p className={errorClass}>{instError.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Major</Label>
            <Input {...register(`${path}.major`)} className={majorError ? "border-destructive" : ""} />
            {majorError && <p className={errorClass}>{majorError.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Input {...register(`${path}.graduationYear`)} className={yearError ? "border-destructive" : ""} />
            {yearError && <p className={errorClass}>{yearError.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>GPA</Label>
            <Input {...register(`${path}.gpa`)} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-20">
      {/* C. EDUCATION */}
      <div className="space-y-10">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">C. Pendidikan / Education</h2>
          <p className="text-sm text-slate-500 mt-1">Academic background (SD - SLTA Required).</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <EduForm label="Primary / SD" path="education.sd" required />
          <EduForm label="Junior High / SLTP" path="education.sltp" required />
          <EduForm label="Senior High / SLTA" path="education.slta" required />
          <EduForm label="Diploma / D3" path="education.d3" />
          <EduForm label="Bachelor / S1" path="education.s1" />
          <EduForm label="Master / S2" path="education.s2" />
        </div>
      </div>

      {/* D. COURSES */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">D. Kursus / Courses</h2>
            <p className="text-sm text-slate-500 mt-1">Certifications or training programs (Max 5).</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => appendCourse({ topic: "", duration: "", year: "", organizer: "", location: "", financedBy: "" })} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Course
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((field, index) => (
            <Card key={field.id} className="relative shadow-sm border-slate-100">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeCourse(index)} className="absolute top-2 right-2 text-slate-300 hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
              <CardContent className="pt-8 space-y-4">
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Input {...register(`courses.${index}.topic`)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input {...register(`courses.${index}.duration`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input {...register(`courses.${index}.year`)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Organizer</Label>
                  <Input {...register(`courses.${index}.organizer`)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input {...register(`courses.${index}.location`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Financed By</Label>
                    <Input {...register(`courses.${index}.financedBy`)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* E. LANGUAGES */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">E. Bahasa / Languages</h2>
            <p className="text-sm text-slate-500 mt-1">Foreign language proficiency (Max 4).</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => appendLang({ language: "", read: "", speak: "", write: "" })} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Language
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((field, index) => (
            <Card key={field.id} className="relative shadow-sm border-slate-100">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeLang(index)} className="absolute top-2 right-2 text-slate-300 hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
              <CardContent className="pt-8 space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input {...register(`languages.${index}.language`)} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label>Read</Label>
                    <Input {...register(`languages.${index}.read`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Speak</Label>
                    <Input {...register(`languages.${index}.speak`)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Write</Label>
                    <Input {...register(`languages.${index}.write`)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
