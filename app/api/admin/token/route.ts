import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';
import crypto from 'crypto';

const DB_NAME = 'disc_db';
const COLLECTION = 'invitations';

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // Generate simple 6-char token or UUID? User said "link unik". UUID is safer.
    // But maybe short code is nicer? Let's use 8-char random string.
    const token = crypto.randomBytes(4).toString('hex'); // 8 chars

    await db.collection(COLLECTION).insertOne({
      token: token,
      used: false,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to generate token' }, { status: 500 });
  }
}
