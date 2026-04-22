import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

const DB_NAME = 'disc_db';
const COLLECTION = 'invitations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) return NextResponse.json({ valid: false });

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const invite = await db.collection(COLLECTION).findOne({ token: token });

    if (invite && (invite.isPermanent || !invite.used)) {
      return NextResponse.json({ 
        valid: true, 
        type: invite.type || 'TEST' 
      });
    }
    return NextResponse.json({ valid: false });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
