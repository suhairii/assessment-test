import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export const CourseLanguageSection = () => {
  const { register, control } = useFormContext();
  const { fields: courses, append: appendCourse, remove: removeCourse } = useFieldArray({ control, name: "courses" });
  const { fields: languages, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "languages" });

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:bg-slate-50";
  const labelClass = "text-[11px] font-semibold text-slate-500 mb-1 block uppercase tracking-tight";

  return (
    <div className="space-y-12">
      {/* COURSES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-semibold text-slate-900">Courses</h2>
          <button type="button" onClick={() => appendCourse({ topic: "", duration: "", year: "", organizer: "", location: "", financedBy: "" })} className="text-blue-600 flex items-center gap-1 text-[13px] font-medium hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Course
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((field, index) => (
            <div key={field.id} className="p-5 border border-slate-100 rounded-xl relative group bg-white shadow-sm">
              <button type="button" onClick={() => removeCourse(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Topic / Topik</label>
                  <input {...register(`courses.${index}.topic`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Duration / Lama</label>
                  <input {...register(`courses.${index}.duration`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Year / Tahun</label>
                  <input {...register(`courses.${index}.year`)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Organizer / Penyelenggara</label>
                  <input {...register(`courses.${index}.organizer`)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LANGUAGES */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-semibold text-slate-900">Foreign Languages</h2>
          <button type="button" onClick={() => appendLang({ language: "", read: "", speak: "", write: "" })} className="text-blue-600 flex items-center gap-1 text-[13px] font-medium hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Language
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((field, index) => (
            <div key={field.id} className="p-5 border border-slate-100 rounded-xl relative bg-white shadow-sm">
              <button type="button" onClick={() => removeLang(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Language / Bahasa</label>
                  <input {...register(`languages.${index}.language`)} className={inputClass} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div><label className={labelClass}>Read</label><input {...register(`languages.${index}.read`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Speak</label><input {...register(`languages.${index}.speak`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Write</label><input {...register(`languages.${index}.write`)} className={inputClass} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
