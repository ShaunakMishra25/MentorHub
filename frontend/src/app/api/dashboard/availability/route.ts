import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * PUT /api/dashboard/availability
 * Updates the authenticated mentor's availability
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

        const backendResponse = await fetch(`${BACKEND_URL}/api/mentor/availability`, {
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
            console.error("[Dashboard Availability API] Failed to parse backend response. Status:", backendResponse.status, "Body:", responseText.substring(0, 500));
            return NextResponse.json(
                { success: false, msg: "Invalid response from backend" },
                { status: 502 }
            );
        }

        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        console.error("Dashboard Availability Update API error:", error);
        return NextResponse.json(
            { success: false, msg: "Failed to save availability" },
            { status: 500 }
        );
    }
}
