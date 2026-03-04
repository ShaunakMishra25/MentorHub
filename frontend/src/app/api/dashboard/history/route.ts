import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * GET /api/dashboard/history
 * Fetches session history for the authenticated user (mentor or student)
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
    
    const backendResponse = await fetch(`${BACKEND_URL}/api/mentor/history`, {
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
      console.error("[Dashboard History API] Failed to parse backend response");
      return NextResponse.json(
        { success: false, msg: "Invalid response from backend", sessions: [] },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Dashboard History API error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch session history", sessions: [] },
      { status: 500 }
    );
  }
}
