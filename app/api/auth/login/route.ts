import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, rememberMe } = body;

  let role = "";

  if (username === "admin" && password === "admin123") {
    role = "admin";
  } else if (username === "hrd" && password === "hrd123") {
    role = "hrd";
  }

  if (role) {
    // Set cookie with role
    const cookieStore = await cookies();
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days vs 1 day
    
    cookieStore.set("admin_session", role, {
      httpOnly: false, // Changed to false so client can read it easily for UI logic (Sidebar/Buttons)
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAge, 
      path: "/",
    });

    return NextResponse.json({ success: true, role });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}