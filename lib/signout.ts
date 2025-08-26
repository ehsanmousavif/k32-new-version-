import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  return () => {
    localStorage.removeItem("token");

    router.push("/signin");
    router.refresh();
  };
}
