import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * GET /api/dashboard/sessions
 * Fetches upcoming sessions for the authenticated user (mentor or student)
 */
export async function GET(request: NextRequest) {
  try {
    const { userId, getToken } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = await getToken();
    
    const backendResponse = await fetch(`${BACKEND_URL}/api/mentor/upcoming`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const responseText = await backendResponse.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("[Dashboard Sessions API] Failed to parse backend response");
      return NextResponse.json(
        { success: false, msg: "Invalid response from backend", sessions: [] },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Dashboard Sessions API error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch sessions", sessions: [] },
      { status: 500 }
    );
  }
}
