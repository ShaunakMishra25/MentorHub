"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Hide the navbar on dashboard and onboarding routes
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/onboarding")) {
        return null;
    }

    return <Navbar />;
}
