import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';
import { iqQuestions } from '@/src/data/iq-data';

const DB_NAME = 'disc_db';
const COLLECTION_NAME = 'iq_questions';

async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

export async function GET() {
  try {
    const db = await getDb();
    let questions = await db.collection(COLLECTION_NAME).find({}).sort({ id: 1 }).toArray();

    // Auto-seed if empty
    if (questions.length === 0) {
      await db.collection(COLLECTION_NAME).insertMany(iqQuestions);
      questions = await db.collection(COLLECTION_NAME).find({}).sort({ id: 1 }).toArray();
    }

    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, question, options, image } = body;

    const db = await getDb();
    await db.collection(COLLECTION_NAME).updateOne(
      { id: id },
      { $set: { question, options, image } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update question' }, { status: 500 });
  }
}
