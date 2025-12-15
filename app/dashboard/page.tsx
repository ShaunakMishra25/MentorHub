import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const role = "student";

  if (role === "mentor") {
    redirect("/mentor/dashboard");
  }

  redirect("/student/dashboard");
}
