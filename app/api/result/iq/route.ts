import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';
import crypto from 'crypto';

const DB_NAME = 'disc_db';
const COLLECTION_NAME = 'iq_results';
const INVITE_COLLECTION = 'invitations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    const token = body.token;
    
    if (!process.env.MONGODB_URI) return NextResponse.json({ success: true, id: id, warning: "Database not connected" });

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Validate and Mark Token
    const invite = await db.collection(INVITE_COLLECTION).findOne({ token: token });
    if (!invite || invite.used) return NextResponse.json({ success: false, error: 'Token tidak valid.' }, { status: 403 });
    
    await db.collection(INVITE_COLLECTION).updateOne({ token: token }, { $set: { used: true } });

    await db.collection(COLLECTION_NAME).insertOne({
      id: id,
      createdAt: new Date(),
      name: body.name,
      position: body.position,
      date: body.date,
      resultData: body.resultData
    });

    return NextResponse.json({ success: true, id: id });
  } catch (error) {
    console.error('Error saving IQ result:', error);
    return NextResponse.json({ success: false, error: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ success: false, error: 'Database not connected' }, { status: 500 });
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).findOne({ id: id });
    if (!result) return NextResponse.json({ success: false, error: 'Result not found' }, { status: 404 });

    const data = {
        id: result.id,
        createdAt: result.createdAt,
        name: result.name,
        position: result.position,
        date: result.date,
        resultData: result.resultData
    };
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch result' }, { status: 500 });
  }
}
