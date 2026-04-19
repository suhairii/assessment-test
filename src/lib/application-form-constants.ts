export const FORM_STATEMENTS = {
  finalDeclaration: {
    title: "Final Section & Declaration",
    subtitle: "Please provide your salary expectation and expected join date.",
    agreement: {
      id: "Dengan ini saya menyatakan bahwa informasi yang diberikan di atas adalah benar dan jika dalam keadaan apapun, ada keliru atau informasi palsu yang ditemukan, saya mengerti bahwa saya sepenuhnya akan bertanggung jawab.",
      en: "I hereby certify that the information given above is true and if under any circumstances, there are any misrepresentation or fake information is found, I understand that I shall fully be held responsible."
    }
  }
};

export const AVAILABILITY_OPTIONS = [
  { value: "Immediately", label: "Immediately / Secepatnya" },
  { value: "2 Weeks Notice", label: "2 Weeks Notice / 2 Minggu" },
  { value: "1 Month Notice", label: "1 Month Notice / 1 Bulan" },
  { value: "2 Months Notice", label: "2 Months Notice / 2 Bulan" },
  { value: "Negotiable", label: "Negotiable / Bisa Dinegosiasikan" },
];

export const STEPS_METADATA = [
  { id: "personal_family", title: "Personal & Family Info", fields: ["personalData", "familyData"] },
  { id: "edu_course_lang", title: "Education, Courses & Languages", fields: ["education", "courses", "languages"] },
  { id: "work_social", title: "Work Experience & Social Activity", fields: ["employmentHistory", "socialActivities"] },
  { id: "refs", title: "References & Emergency", fields: ["references", "emergencyContacts"] },
  { id: "final", title: "Final Declaration", fields: ["finalSection"] },
];

export const FIELD_LABELS: Record<string, string> = {
  "personalData.appliedPosition": "Applied Position",
  "personalData.fullName": "Full Name",
  "personalData.mobilePhone": "Mobile Phone Number",
  "familyData.father.name": "Father's Name",
  "education.sd.institution": "SD School Name",
  "finalSection.expectedSalary": "Expected Salary",
  "finalSection.expectedJoinDate": "Expected Join Date",
  "finalSection.declaration": "Declaration Agreement"
};
