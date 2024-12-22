import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("ecosoft_auth")?.value;
  const session = await decrypt(cookie);

  if (!session.user) {
    redirect("/dashboard-login");
  }

  return { isAuth: true, user: session.user };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.user),
      // Explicitly return the columns you need rather than the whole user object
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    //console.log("Failed to fetch user");
    return null;
  }
});
