interface Props {
  userName: string;
  password: string;
}

export async function sendAuthData({ userName, password }: Props) {
  const res = await fetch("/api/internal/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
  });

  const data = await res.json();

  localStorage.setItem("auth-token", data.token);

  if (res.ok) {
    console.log("✅ Success", data);
  } else {
    console.error("❌ Server error", data);
  }
}
