import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Get the current session server-side
export async function getSession() {
  return await getServerSession();
}

// Get the current user server-side
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Auth check for server components
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
