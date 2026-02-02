import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    // Ping the database to verify connection
    await client.db('admin').command({ ping: 1 });
    
    return NextResponse.json({ 
        status: 'ok', 
        message: 'MongoDB Connection Successful',
        timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database Health Check Failed:', error);
    return NextResponse.json({ 
        status: 'error', 
        message: 'Database Connection Failed', 
        error: String(error) 
    }, { status: 500 });
  }
}
