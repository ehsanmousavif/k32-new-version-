import { headers } from "next/headers";

export async function DispatchToken() {
  const h = await headers();
  const auth = h.get("Authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  return auth.split(" ")[1];
}
