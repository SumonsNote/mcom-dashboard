import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/dashboard");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p>API TEST</p>
    </div>
  );
}
