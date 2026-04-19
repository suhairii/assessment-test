import { z } from "zod";

const FamilyMemberSchema = z.object({
  name: z.string().min(1, "Wajib diisi"),
  placeDateOfBirth: z.string().min(1, "Wajib diisi"),
  occupation: z.string().min(1, "Wajib diisi"),
});

const RequiredEducationSchema = z.object({
  institution: z.string().min(1, "Wajib diisi"),
  major: z.string().min(1, "Wajib diisi"),
  graduationYear: z.string().min(1, "Wajib diisi"),
  gpa: z.string().optional(),
});

const OptionalEducationSchema = z.object({
  institution: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
});

export const ApplicationFormSchema = z.object({
  personalData: z.object({
    appliedPosition: z.string().min(1, "Wajib diisi"),
    vacancySource: z.string().min(1, "Wajib diisi"),
    fullName: z.string().min(1, "Wajib diisi"),
    gender: z.enum(["Laki-laki/Male", "Perempuan/Female"]),
    nickname: z.string().optional(),
    bloodType: z.string().optional(),
    placeOfBirth: z.string().min(1, "Wajib diisi"),
    dateOfBirth: z.string().min(1, "Wajib diisi"),
    religion: z.string().optional(),
    ktpNo: z.string().min(1, "Wajib diisi"),
    ktpValidUntil: z.string().optional(),
    email: z.string().email("Email tidak valid"),
    passportNo: z.string().optional(),
    passportValidUntil: z.string().optional(),
    homePhone: z.string().optional(),
    simNo: z.string().optional(),
    simValidUntil: z.string().optional(),
    mobilePhone: z.string().min(1, "Wajib diisi"),
    currentAddress: z.string().min(1, "Wajib diisi"),
    ktpAddress: z.string().min(1, "Wajib diisi"),
    status: z.enum(["Single", "Married", "Widow", "Widower"]),
  }),

  familyData: z.object({
    father: FamilyMemberSchema,
    mother: FamilyMemberSchema,
    siblings: z.array(FamilyMemberSchema).optional(),
    spouse: FamilyMemberSchema.partial().optional(),
    children: z.array(FamilyMemberSchema).optional(),
  }),

  education: z.object({
    sd: RequiredEducationSchema,
    sltp: RequiredEducationSchema,
    slta: RequiredEducationSchema,
    d3: OptionalEducationSchema,
    s1: OptionalEducationSchema,
    s2: OptionalEducationSchema,
  }),

  courses: z.array(z.object({
    topic: z.string().optional(),
    duration: z.string().optional(),
    year: z.string().optional(),
    organizer: z.string().optional(),
    location: z.string().optional(),
    financedBy: z.string().optional(),
  })).max(5),

  languages: z.array(z.object({
    language: z.string().optional(),
    read: z.string().optional(),
    speak: z.string().optional(),
    write: z.string().optional(),
  })).max(4),

  employmentHistory: z.array(z.object({
    companyName: z.string().optional(),
    jobTitle: z.string().optional(),
    salary: z.string().optional(),
    officePhone: z.string().optional(),
    startWorking: z.string().optional(),
    resigned: z.string().optional(),
    reasonForResignation: z.string().optional(),
    jobDesc: z.string().optional(),
    businessType: z.string().optional(),
    supervisorName: z.string().optional(),
    supervisorTitle: z.string().optional(),
    reportingCount: z.string().optional(),
    paklaringFile: z.string().optional(), // Tambahkan field paklaring
  })).length(3),

  socialActivities: z.array(z.object({
    orgName: z.string().optional(),
    activity: z.string().optional(),
    function: z.string().optional(),
    year: z.string().optional(),
  })).max(3),

  references: z.array(z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    jobTitle: z.string().optional(),
    companyName: z.string().optional(),
    mobilePhone: z.string().optional(),
  })),

  emergencyContacts: z.array(z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    mobilePhone: z.string().optional(),
  })),

  finalSection: z.object({
    expectedSalary: z.string().min(1, "Wajib diisi"),
    availability: z.string().min(1, "Wajib diisi"),
    expectedJoinDate: z.string().min(1, "Wajib diisi"),
    cvFile: z.string().optional(), // Tambahkan ini untuk menyimpan base64 atau nama file
    declaration: z.boolean().refine(val => val === true, {
      message: "Anda harus menyetujui pernyataan ini"
    }),
  }),
});

export type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;
