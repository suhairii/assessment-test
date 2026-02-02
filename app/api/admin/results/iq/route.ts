import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

const DB_NAME = 'disc_db';
const COLLECTION_NAME = 'iq_results';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json({ success: false, error: 'Database not connected' });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // Sort by createdAt desc (-1)
    const results = await db.collection(COLLECTION_NAME)
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    const data = results.map(row => ({
        id: row.id,
        createdAt: row.createdAt,
        name: row.name,
        position: row.position,
        date: row.date,
        resultData: row.resultData
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching admin results:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    if (!process.env.MONGODB_URI) {
        return NextResponse.json({ success: false, error: 'Database not connected' });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    await db.collection(COLLECTION_NAME).deleteOne({ id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting result:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete result' }, { status: 500 });
  }
}
