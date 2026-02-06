import { NextResponse } from "next/server";
import { settingsDb } from "@/src/lib/settings";

export async function GET() {
  const settings = settingsDb.getSettings();
  return NextResponse.json({ success: true, maintenance: settings.maintenance });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { maintenance } = body;

    if (typeof maintenance !== "boolean") {
      return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
    }

    const success = settingsDb.updateSettings({ maintenance });
    
    if (success) {
      return NextResponse.json({ success: true, maintenance });
    } else {
      return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
