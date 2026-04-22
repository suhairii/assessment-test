"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { 
  Printer, ArrowLeft, User, Briefcase, GraduationCap, Users, 
  Languages, Phone, Heart, FileText, Download, Award, Eye
} from "lucide-react";
import { FileViewer } from "@/src/components/application-form/FileViewer";

function DetailContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      setError("ID pelamar tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/applications`);
        const allData = await response.json();
        
        if (Array.isArray(allData)) {
          const detail = allData.find((item: any) => item.id === id);
          if (detail) {
            setData(detail);
          } else {
            setError("Data pelamar tidak ditemukan.");
          }
        } else {
          setError("Format data tidak valid.");
        }
      } catch (err) {
        console.error("Error fetching candidate:", err);
        setError("Gagal memuat data pelamar.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [searchParams]);

  if (loading) return <div className="p-10 text-center text-black font-black uppercase tracking-widest animate-pulse">Loading Candidate Detail...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-black uppercase tracking-widest pt-20">{error}</div>;
  if (!data) return null;

  const SectionTitle = ({ title, step }: { title: string, step: string }) => (
    <div className="border-l-[6px] border-black pl-6 mb-10 mt-16 first:mt-0 print:mt-4 print:mb-2 print:border-l-4 print:pl-2 break-inside-avoid">
      <div className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-2 opacity-40 print:text-[6px] print:mb-0">{step}</div>
      <h2 className="text-3xl font-black uppercase tracking-tighter text-black print:text-xs">{title}</h2>
    </div>
  );

  const DetailCard = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
    <div className={`bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] p-8 md:p-10 transition-all hover:border-black print:p-2 print:rounded-none print:border-gray-200 print:border break-inside-avoid mb-6 print:mb-2 ${className}`}>
      {title && <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-8 pb-4 border-b border-gray-100 print:mb-1 print:pb-0.5 print:text-[7px]">{title}</h3>}
      <div className="space-y-6 print:space-y-0.5">
        {children}
      </div>
    </div>
  );

  const InfoRow = ({ label, value }: { label: string, value: any }) => (
    <div className="flex flex-col space-y-1 print:space-y-0 print:flex-row print:justify-between print:items-baseline print:border-b print:border-gray-50 print:pb-0.5">
      <span className="text-[10px] font-black text-black uppercase tracking-widest opacity-40 print:text-[6px] print:opacity-40">{label}</span>
      <span className="text-base font-bold text-black leading-tight print:text-[7px] print:text-right print:ml-2">{String(value || "-")}</span>
    </div>
  );

  const AttachmentPreview = ({ url, label, sublabel }: { url: string, label: string, sublabel?: string }) => {
    if (!url || !url.startsWith('http')) return null;
    const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)/i);
    const isPdf = url.toLowerCase().includes('.pdf');
    
    return (
      <div className="break-before-page mt-4 print:mt-0 column-span-all">
        <div className="border-2 border-black rounded-3xl overflow-hidden bg-white print:rounded-none print:border-gray-200 print:border-t-0">
            <div className="bg-black text-white p-4 flex justify-between items-center print:bg-gray-50 print:text-black print:p-1 print:border-b">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest print:text-[7px]">{label}</p>
                    {sublabel && <p className="text-[8px] opacity-60 uppercase print:text-[6px]">{sublabel}</p>}
                </div>
                <div className="text-[7px] font-mono opacity-40 truncate max-w-[300px]">{url}</div>
            </div>
            <div className="bg-white flex items-start justify-center">
                {isImage ? (
                    <img src={url} alt={label} className="max-w-full h-auto" />
                ) : isPdf ? (
                    <iframe 
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} 
                        className="w-full h-[1120px] border-none print:h-[1050px]"
                        title={label}
                    />
                ) : (
                    <div className="p-10 text-center">
                        <FileText size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="text-xs font-black uppercase">Format not supported</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-16 print:p-0 text-black">
      <style jsx global>{`
        @media print {
          @page { margin: 0.8cm; size: A4; }
          body { font-size: 8px !important; background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          
          .columns-wrapper {
            column-count: 2 !important;
            column-gap: 15px !important;
            display: block !important;
          }
          
          .break-before-page { break-before: page !important; page-break-before: always !important; }
          .column-span-all { column-span: all !important; }
          h1, h2, h3 { page-break-after: avoid; }
          
          iframe {
            display: block !important;
            visibility: visible !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* ACTION BAR (NO PRINT) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 no-print">
          <Link href="/admin/application-form" className="group flex items-center gap-4 text-black font-black text-xs uppercase tracking-widest">
            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowLeft size={20} />
            </div>
            Back to Dashboard
          </Link>
          <div className="flex gap-4">
             <p className="hidden md:block text-[10px] font-bold text-red-500 uppercase max-w-[200px] leading-tight text-right italic">
                Wait for documents to load before printing.
             </p>
             <button 
                onClick={() => window.print()} 
                className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition shadow-2xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-3"
              >
                <Printer size={20} /> Print Full PDF
              </button>
          </div>
        </div>

        {/* PRINT HEADER */}
        <div className="hidden print:block border-b-2 border-black pb-4 mb-4">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 text-black">Application Form</h1>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Internal Recruitment Document</p>
                </div>
                <div className="text-right">
                    <p className="text-[6px] font-black uppercase tracking-widest opacity-40">Application ID</p>
                    <p className="font-mono font-bold text-[8px]">#{String(data.id || "").substring(0, 12)}</p>
                </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="columns-wrapper md:grid md:grid-cols-2 md:gap-12 md:items-start print:block print:column-count-2 print:column-gap-4">
            
            <div className="space-y-2">
                {/* 1. PERSONAL DATA SECTION */}
                <SectionTitle title="Personal Information" step="Section 01" />
                <DetailCard title="Primary & Legal">
                    <InfoRow label="Applied Position" value={data.appliedPosition} />
                    <InfoRow label="Vacancy Source" value={data.personalData?.vacancySource} />
                    <InfoRow label="Full Name" value={data.personalData?.fullName} />
                    <InfoRow label="Nickname" value={data.personalData?.nickname} />
                    <InfoRow label="Gender" value={data.personalData?.gender} />
                    <InfoRow label="Status" value={data.personalData?.status} />
                    <InfoRow label="Religion" value={data.personalData?.religion} />
                    <InfoRow label="Blood Type" value={data.personalData?.bloodType} />
                    <InfoRow label="Place of Birth" value={data.personalData?.placeOfBirth} />
                    <InfoRow label="Date of Birth" value={data.personalData?.dateOfBirth} />
                    <InfoRow label="KTP Number" value={data.personalData?.ktpNo} />
                    <InfoRow label="KTP Valid Until" value={data.personalData?.ktpValidUntil} />
                    <InfoRow label="Email Address" value={data.personalData?.email} />
                    <InfoRow label="Mobile Phone" value={data.personalData?.mobilePhone} />
                    <InfoRow label="Home Phone" value={data.personalData?.homePhone} />
                    <InfoRow label="Passport No" value={data.personalData?.passportNo} />
                    <InfoRow label="Passport Valid Until" value={data.personalData?.passportValidUntil} />
                    <InfoRow label="SIM No" value={data.personalData?.simNo} />
                    <InfoRow label="SIM Valid Until" value={data.personalData?.simValidUntil} />
                </DetailCard>

                <DetailCard title="Address History">
                    <InfoRow label="Current Address" value={data.personalData?.currentAddress} />
                    <InfoRow label="KTP Address" value={data.personalData?.ktpAddress} />
                </DetailCard>

                {/* 3. EDUCATION SECTION */}
                <SectionTitle title="Academic & Skills" step="Section 02" />
                <div className="space-y-4">
                    {["sd", "sltp", "slta", "d3", "s1", "s2"].map((level) => {
                        const edu = data.education?.[level] || {};
                        return (
                            <DetailCard key={level} title={level.toUpperCase()} className="bg-gray-50/50">
                                <InfoRow label="Institution" value={edu.institution} />
                                <InfoRow label="Major" value={edu.major} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoRow label="Year" value={edu.graduationYear} />
                                    <InfoRow label="GPA / Nilai" value={edu.gpa} />
                                </div>
                            </DetailCard>
                        );
                    })}
                </div>

                <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40 mt-10 mb-4 print:px-2">Courses & Training</p>
                {(data.courses && data.courses.length > 0 ? data.courses : [{}, {}]).map((course: any, idx: number) => (
                    <DetailCard key={idx} title={`Course 0${idx + 1}`} className="bg-gray-50/50">
                        <InfoRow label="Topic" value={course.topic} />
                        <InfoRow label="Organizer" value={course.organizer} />
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow label="Duration" value={course.duration} />
                            <InfoRow label="Year" value={course.year} />
                        </div>
                    </DetailCard>
                ))}

                <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40 mt-10 mb-4 print:px-2">Languages</p>
                {(data.languages && data.languages.length > 0 ? data.languages : [{}, {}]).map((lang: any, idx: number) => (
                    <DetailCard key={idx} title={lang.language || `Language 0${idx+1}`} className="bg-gray-50/50">
                        <div className="grid grid-cols-3 gap-4 text-black">
                            <InfoRow label="Read" value={lang.read} />
                            <InfoRow label="Speak" value={lang.speak} />
                            <InfoRow label="Write" value={lang.write} />
                        </div>
                    </DetailCard>
                ))}
            </div>

            <div className="space-y-2">
                {/* 2. FAMILY DATA SECTION */}
                <SectionTitle title="Family Background" step="Section 03" />
                <DetailCard title="Father / Ayah">
                    <InfoRow label="Name" value={data.familyData?.father?.name} />
                    <InfoRow label="DOB" value={data.familyData?.father?.placeDateOfBirth} />
                    <InfoRow label="Occupation" value={data.familyData?.father?.occupation} />
                </DetailCard>
                
                <DetailCard title="Mother / Ibu">
                    <InfoRow label="Name" value={data.familyData?.mother?.name} />
                    <InfoRow label="DOB" value={data.familyData?.mother?.placeDateOfBirth} />
                    <InfoRow label="Occupation" value={data.familyData?.mother?.occupation} />
                </DetailCard>

                <DetailCard title="Spouse / Suami / Istri">
                    <InfoRow label="Name" value={data.familyData?.spouse?.name} />
                    <InfoRow label="DOB" value={data.familyData?.spouse?.placeDateOfBirth} />
                    <InfoRow label="Occupation" value={data.familyData?.spouse?.occupation} />
                </DetailCard>

                <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40 mt-6 mb-2">Siblings</p>
                {(data.familyData?.siblings || []).map((sibling: any, idx: number) => (
                    <DetailCard key={idx} title={`Sibling 0${idx + 1}`} className="bg-gray-50/50">
                        <InfoRow label="Name" value={sibling.name} />
                        <InfoRow label="DOB" value={sibling.placeDateOfBirth} />
                        <InfoRow label="Occupation" value={sibling.occupation} />
                    </DetailCard>
                ))}

                <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40 mt-6 mb-2">Children</p>
                {(data.familyData?.children || [{}, {}]).map((child: any, idx: number) => (
                    <DetailCard key={idx} title={`Child 0${idx + 1}`} className="bg-gray-50/50">
                        <InfoRow label="Name" value={child.name} />
                        <InfoRow label="DOB" value={child.placeDateOfBirth} />
                        <InfoRow label="Occupation" value={child.occupation} />
                    </DetailCard>
                ))}

                <SectionTitle title="Employment History" step="Section 04" />
                {(data.employmentHistory || [{}, {}, {}]).map((job: any, idx: number) => (
                    <DetailCard key={idx} title={job.companyName || `Position Entry 0${idx + 1}`}>
                        <InfoRow label="Job Title" value={job.jobTitle} />
                        <InfoRow label="Business" value={job.businessType} />
                        <InfoRow label="Salary" value={job.salary} />
                        <InfoRow label="Period" value={`${job.startWorking || ""} - ${job.resigned || ""}`} />
                        <InfoRow label="Supervisor" value={`${job.supervisorName} (${job.supervisorTitle})`} />
                        <InfoRow label="Staff Count" value={job.reportingCount} />
                        <InfoRow label="Reason" value={job.reasonForResignation} />
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <InfoRow label="Description" value={job.jobDesc} />
                            {job.paklaringFile && (
                                <FileViewer 
                                    filename={job.paklaringFile} 
                                    label={`Paklaring - ${job.companyName}`} 
                                    type="paklaring" 
                                    trigger={
                                        <button className="no-print flex items-center gap-2 text-black hover:text-gray-600 transition font-black text-[8px] uppercase tracking-widest border-2 border-black px-4 py-1.5 rounded-full ml-4 shrink-0">
                                            <Eye size={14} /> Preview File
                                        </button>
                                    }
                                />
                            )}
                        </div>
                    </DetailCard>
                ))}

                <SectionTitle title="Social & References" step="Section 05" />
                {(data.socialActivities && data.socialActivities.length > 0 ? data.socialActivities : [{}]).map((act: any, idx: number) => (
                    <DetailCard key={idx} title={`Activity 0${idx + 1}`} className="bg-gray-50/50">
                        <InfoRow label="Organization" value={act.orgName} />
                        <InfoRow label="Activity" value={act.activity} />
                        <InfoRow label="Function" value={act.function} />
                        <InfoRow label="Year" value={act.year} />
                    </DetailCard>
                ))}

                <div className="mt-8 space-y-4">
                    <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40">References</p>
                    {(data.references && data.references.length > 0 ? data.references : [{}]).map((ref: any, idx: number) => (
                        <DetailCard key={idx} className="bg-gray-50/50">
                            <InfoRow label="Full Name" value={ref.name} />
                            <InfoRow label="Company" value={`${ref.jobTitle} - ${ref.companyName}`} />
                            <InfoRow label="Contact" value={ref.mobilePhone} />
                        </DetailCard>
                    ))}
                </div>

                <div className="mt-8 space-y-4">
                    <p className="text-[10px] font-black text-black uppercase tracking-widest px-8 opacity-40">Emergency Contacts</p>
                    {(data.emergencyContacts && data.emergencyContacts.length > 0 ? data.emergencyContacts : [{}, {}]).map((emg: any, idx: number) => (
                        <DetailCard key={idx} className="border-black bg-gray-50/50">
                            <InfoRow label="Name" value={emg.name} />
                            <InfoRow label="Relation" value={emg.relationship} />
                            <InfoRow label="Mobile" value={emg.mobilePhone} />
                        </DetailCard>
                    ))}
                </div>

                <SectionTitle title="Final Declaration" step="Section 06" />
                <DetailCard title="Summary" className="border-black border-2">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow label="Expected Salary" value={`Rp ${data.finalSection?.expectedSalary}`} />
                            <InfoRow label="Availability" value={data.finalSection?.availability} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow label="Join Date" value={data.finalSection?.expectedJoinDate} />
                            <div className="flex flex-col no-print">
                                <span className="text-[10px] font-black text-black uppercase tracking-widest opacity-40">CV Attachment</span>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-bold text-black truncate max-w-[150px]">{data.finalSection?.cvFile && data.finalSection.cvFile.startsWith('http') ? data.finalSection.cvFile.split('/').pop() : data.finalSection?.cvFile || "-"}</span>
                                    {data.finalSection?.cvFile && (
                                        <FileViewer 
                                            filename={data.finalSection.cvFile} 
                                            label="Curriculum Vitae" 
                                            type="cv" 
                                            trigger={
                                                <button className="no-print flex items-center gap-2 text-black hover:text-gray-600 transition font-black text-[8px] uppercase tracking-widest border-2 border-black px-3 py-1 rounded-full shrink-0">
                                                    <Eye size={12} /> Preview CV
                                                </button>
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DetailCard>

                <DetailCard className="border-black border-2 bg-white">
                    <div className="flex items-start gap-4 text-black">
                        <Award size={24} className="shrink-0" />
                        <p className="text-[10px] font-black leading-relaxed uppercase">
                            Applicant has officially agreed to all terms. All information provided is true and accurate.
                        </p>
                    </div>
                </DetailCard>
            </div>
        </div>

        <div className="text-center no-print pb-20 border-t border-gray-100 pt-10 mt-20">
            <p className="text-[10px] font-black text-black uppercase tracking-[0.5em] opacity-20">Aptitude Assessment System</p>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-black uppercase tracking-widest text-black animate-pulse">Loading Application Detail...</div>}>
      <DetailContent />
    </Suspense>
  );
}
