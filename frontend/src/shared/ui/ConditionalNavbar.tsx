"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Hide the navbar on mentor dashboard, onboarding, and admin routes
    if (
        pathname?.startsWith("/mentor") ||
        pathname?.startsWith("/onboarding") ||
        pathname?.startsWith("/admin")
    ) {
        return null;
    }

    return <Navbar />;
}
