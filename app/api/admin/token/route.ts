import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';
import crypto from 'crypto';

const DB_NAME = 'disc_db';
const COLLECTION = 'invitations';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const type = body.type || 'TEST'; // Default to TEST for backward compatibility

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const token = crypto.randomBytes(4).toString('hex'); // 8 chars

    await db.collection(COLLECTION).insertOne({
      token: token,
      type: type,
      used: false,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate token' }, { status: 500 });
  }
}
