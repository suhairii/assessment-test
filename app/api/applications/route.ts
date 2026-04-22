import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

const DB_NAME = 'disc_db';
const COLLECTION_NAME = 'applications';
const INVITE_COLLECTION = 'invitations';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = data.token;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Validate Token if exists (application form must have a token now)
    if (token) {
        const invite = await db.collection(INVITE_COLLECTION).findOne({ token: token });
        if (!invite || (!invite.isPermanent && invite.used)) {
            return NextResponse.json({ success: false, error: 'Token tidak valid atau sudah terpakai.' }, { status: 403 });
        }
        
        // Mark token as used only if it's not permanent
        if (!invite.isPermanent) {
            await db.collection(INVITE_COLLECTION).updateOne({ token: token }, { $set: { used: true } });
        }
    }

    // Menambahkan timestamp
    const applicationData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(applicationData);

    return NextResponse.json({ success: true, id: result.insertedId });
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
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const applications = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Transform _id to id for frontend compatibility
    const formatted = applications.map(app => ({
        ...app,
        id: app._id.toString()
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete application' }, { status: 500 });
  }
}
