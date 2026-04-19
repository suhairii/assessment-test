import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const application = await prisma.application.create({
      data: {
        appliedPosition: data.appliedPosition,
        vacancySource: data.vacancySource,
        fullName: data.fullName,
        gender: data.gender,
        nickname: data.nickname,
        bloodType: data.bloodType,
        placeOfBirth: data.placeOfBirth,
        dateOfBirth: data.dateOfBirth,
        religion: data.religion,
        ktpNo: data.ktpNo,
        ktpValidUntil: data.ktpValidUntil,
        email: data.email,
        passportNo: data.passportNo,
        passportValidUntil: data.passportValidUntil,
        homePhone: data.homePhone,
        simNo: data.simNo,
        simValidUntil: data.simValidUntil,
        mobilePhone: data.mobilePhone,
        currentAddress: data.currentAddress,
        ktpAddress: data.ktpAddress,
        status: data.status,
        expectedSalary: data.expectedSalary,
        availability: data.availability,
        expectedJoinDate: data.expectedJoinDate,
        declaration: data.declaration,
        
        // Relations
        familyMembers: {
          create: data.familyMembers?.map((m: any) => ({
            relationship: m.relationship,
            name: m.name,
            placeDateOfBirth: m.placeDateOfBirth,
            occupation: m.occupation
          })) || []
        },
        educations: {
          create: data.educations?.map((e: any) => ({
            level: e.level,
            institution: e.institution,
            major: e.major,
            graduationYear: e.graduationYear,
            gpa: e.gpa
          })) || []
        },
        courses: {
          create: data.courses?.map((c: any) => ({
            topic: c.topic,
            duration: c.duration,
            year: c.year,
            organizer: c.organizer,
            location: c.location,
            financedBy: c.financedBy
          })) || []
        },
        languages: {
          create: data.languages?.map((l: any) => ({
            language: l.language,
            read: l.read,
            speak: l.speak,
            write: l.write
          })) || []
        },
        employmentHistory: {
          create: data.employmentHistory?.map((h: any) => ({
            companyName: h.companyName,
            jobTitle: h.jobTitle,
            salary: h.salary,
            officePhone: h.officePhone,
            startWorking: h.startWorking,
            resigned: h.resigned,
            reasonForResignation: h.reasonForResignation,
            jobDesc: h.jobDesc,
            businessType: h.businessType,
            supervisorName: h.supervisorName,
            supervisorTitle: h.supervisorTitle,
            reportingCount: h.reportingCount
          })) || []
        },
        socialActivities: {
          create: data.socialActivities?.map((s: any) => ({
            orgName: s.orgName,
            activity: s.activity,
            function: s.function,
            year: s.year
          })) || []
        },
        references: {
          create: data.references?.map((r: any) => ({
            name: r.name,
            relationship: r.relationship,
            jobTitle: r.jobTitle,
            companyName: r.companyName,
            mobilePhone: r.mobilePhone
          })) || []
        },
        emergencyContacts: {
          create: data.emergencyContacts?.map((ec: any) => ({
            name: ec.name,
            relationship: ec.relationship,
            mobilePhone: ec.mobilePhone
          })) || []
        }
      }
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        familyMembers: true,
        educations: true,
        courses: true,
        languages: true,
        employmentHistory: true,
        socialActivities: true,
        references: true,
        emergencyContacts: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
