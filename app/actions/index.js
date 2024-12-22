"use server";
import { signIn, signOut } from "@/auth";
import { deleteSession } from "@/lib/session";
import connectMongo from "@/services/mongo";

export async function login(formData) {
  try {
    await connectMongo();
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    await deleteSession();
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    // You might want to return an error message or status here
    return { error: "Failed to logout. Please try again." };
  }
}
