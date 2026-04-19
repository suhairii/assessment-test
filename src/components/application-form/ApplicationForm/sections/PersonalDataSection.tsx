import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/src/components/application-form/ui/input";
import { Label } from "@/src/components/application-form/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/application-form/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/application-form/ui/select";
import { Textarea } from "@/src/components/application-form/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/src/components/application-form/ui/radio-group";

export const PersonalDataSection = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const errorClass = "text-[11px] text-destructive mt-1 font-medium";

  return (
    <div className="space-y-10">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0 border-l-4 border-blue-600 pl-4 rounded-none mb-6">
          <CardTitle className="text-xl font-semibold text-slate-900 leading-none">A. Data Pribadi / Personal Data</CardTitle>
          <CardDescription className="text-sm text-slate-500 mt-2">Provide your basic and legal information.</CardDescription>
        </CardHeader>
        
        <CardContent className="px-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <Label htmlFor="appliedPosition">Applied Position / Posisi yang dilamar</Label>
            <Input id="appliedPosition" {...register("personalData.appliedPosition")} placeholder="e.g. Software Engineer" className={errors.personalData?.appliedPosition ? "border-destructive" : ""} />
            {errors.personalData?.appliedPosition && <p className={errorClass}>{errors.personalData.appliedPosition.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vacancySource">Vacancy Source / Sumber Lowongan</Label>
            <Input id="vacancySource" {...register("personalData.vacancySource")} placeholder="e.g. LinkedIn" className={errors.personalData?.vacancySource ? "border-destructive" : ""} />
            {errors.personalData?.vacancySource && <p className={errorClass}>{errors.personalData.vacancySource.message as string}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="fullName">Full Name / Nama Lengkap</Label>
            <Input id="fullName" {...register("personalData.fullName")} className={errors.personalData?.fullName ? "border-destructive" : ""} />
            {errors.personalData?.fullName && <p className={errorClass}>{errors.personalData.fullName.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gender / Jenis Kelamin</Label>
            <Controller
              name="personalData.gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={errors.personalData?.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki/Male">Laki-laki/Male</SelectItem>
                    <SelectItem value="Perempuan/Female">Perempuan/Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname / Nama Panggilan</Label>
            <Input id="nickname" {...register("personalData.nickname")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Blood Type</Label>
              <Controller
                name="personalData.bloodType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "AB", "O"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Input id="religion" {...register("personalData.religion")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input id="placeOfBirth" {...register("personalData.placeOfBirth")} className={errors.personalData?.placeOfBirth ? "border-destructive" : ""} />
              {errors.personalData?.placeOfBirth && <p className={errorClass}>{errors.personalData.placeOfBirth.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" {...register("personalData.dateOfBirth")} className={errors.personalData?.dateOfBirth ? "border-destructive" : ""} />
              {errors.personalData?.dateOfBirth && <p className={errorClass}>{errors.personalData.dateOfBirth.message as string}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ktpNo">KTP No</Label>
              <Input id="ktpNo" {...register("personalData.ktpNo")} className={errors.personalData?.ktpNo ? "border-destructive" : ""} />
              {errors.personalData?.ktpNo && <p className={errorClass}>{errors.personalData.ktpNo.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ktpValidUntil">KTP Valid Until</Label>
              <Input id="ktpValidUntil" {...register("personalData.ktpValidUntil")} placeholder="Lifetime" className={errors.personalData?.ktpValidUntil ? "border-destructive" : ""} />
              {errors.personalData?.ktpValidUntil && <p className={errorClass}>{errors.personalData.ktpValidUntil.message as string}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("personalData.email")} className={errors.personalData?.email ? "border-destructive" : ""} />
            {errors.personalData?.email && <p className={errorClass}>{errors.personalData.email.message as string}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passportNo">Passport No</Label>
              <Input id="passportNo" {...register("personalData.passportNo")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passportValidUntil">Passport Valid Until</Label>
              <Input id="passportValidUntil" {...register("personalData.passportValidUntil")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobilePhone">Mobilephone Number</Label>
            <Input id="mobilePhone" {...register("personalData.mobilePhone")} className={errors.personalData?.mobilePhone ? "border-destructive" : ""} />
            {errors.personalData?.mobilePhone && <p className={errorClass}>{errors.personalData.mobilePhone.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="homePhone">Home Phone Number</Label>
            <Input id="homePhone" {...register("personalData.homePhone")} />
          </div>
        </CardContent>

        <div className="grid grid-cols-1 gap-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="currentAddress">Current Address / Alamat Sekarang</Label>
            <Textarea id="currentAddress" {...register("personalData.currentAddress")} rows={3} className={errors.personalData?.currentAddress ? "border-destructive" : ""} />
            {errors.personalData?.currentAddress && <p className={errorClass}>{errors.personalData.currentAddress.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ktpAddress">Address in accordance with KTP / Alamat Sesuai KTP</Label>
            <Textarea id="ktpAddress" {...register("personalData.ktpAddress")} rows={3} className={errors.personalData?.ktpAddress ? "border-destructive" : ""} />
            {errors.personalData?.ktpAddress && <p className={errorClass}>{errors.personalData.ktpAddress.message as string}</p>}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Label>Status / Status Pernikahan</Label>
          <Controller
            name="personalData.status"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Single", "Married", "Widow", "Widower"].map((val) => (
                  <div key={val} className="flex items-center space-x-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value={val} id={`status-${val}`} />
                    <Label htmlFor={`status-${val}`} className="cursor-pointer">{val}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>
      </Card>
    </div>
  );
};
