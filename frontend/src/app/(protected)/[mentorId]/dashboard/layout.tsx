import { MentorDashboardSidebar } from "@/components/dashboard/sidebar";

export default async function MentorDashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ mentorId: string }>;
}) {
    const { mentorId } = await params;

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            <MentorDashboardSidebar mentorId={mentorId} />

            {/* Main Content Area */}
            {/* md:ml-[260px] or md:ml-[80px] would ideally be handled by state in a shared context, 
          but for simplicity in Server Components, we can assume expanded by default or use CSS peer classes 
          if it was highly interactive. Since Sidebar is a Client Component, we can let it handle its own width.
          Here, we provide a margin left that perfectly matches the expanded sidebar state (260px). 
          For mobile, it should be 0. */}
            <main className="flex-1 w-full md:ml-[260px] p-6 text-foreground transition-all duration-300 min-h-screen flex flex-col">
                {children}
            </main>
        </div>
    );
}
