import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * GET /api/dashboard/profile
 * Fetches the authenticated mentor's profile
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
    
    // First get the user's MongoDB ID from the mentors list
    const mentorsResponse = await fetch(`${BACKEND_URL}/api/mentor/mentors`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!mentorsResponse.ok) {
      return NextResponse.json(
        { success: false, msg: "Failed to fetch mentors" },
        { status: 500 }
      );
    }

    const mentorsData = await mentorsResponse.json();
    const mentors = mentorsData.mentors || [];
    const currentMentor = mentors.find((m: any) => m.clerkId === userId);

    if (!currentMentor) {
      return NextResponse.json(
        { success: false, msg: "Mentor profile not found" },
        { status: 404 }
      );
    }

    // Now fetch the full profile with availability matrix
    const profileResponse = await fetch(`${BACKEND_URL}/api/mentor/mentor/${currentMentor._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const responseText = await profileResponse.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("[Dashboard Profile API] Failed to parse backend response");
      return NextResponse.json(
        { success: false, msg: "Invalid response from backend" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: profileResponse.status });
  } catch (error) {
    console.error("Dashboard Profile API error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/dashboard/profile
 * Updates the authenticated mentor's profile
 */
export async function PUT(request: NextRequest) {
  try {
    const { userId, getToken } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = await getToken();
    const body = await request.json();
    
    const backendResponse = await fetch(`${BACKEND_URL}/api/mentor/mentor/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const responseText = await backendResponse.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("[Dashboard Profile API] Failed to parse backend response");
      return NextResponse.json(
        { success: false, msg: "Invalid response from backend" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Dashboard Profile Update API error:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to update profile" },
      { status: 500 }
    );
  }
}
