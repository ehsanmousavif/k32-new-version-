interface FetchOptions<T> {
  endpoint: string;
  body?: T;
  requiresAuth?: boolean;
}

interface SuccessResponseType<T> {
  data: T;
  ok: true;
  message: string;
}

interface FailedResponseType {
  ok: false;
  message: string;
}

export async function FetchingData<TRequest = unknown, TResponse = unknown>({
  endpoint,
  body,
  requiresAuth = false,
}: FetchOptions<TRequest>): Promise<
  SuccessResponseType<TResponse> | FailedResponseType
> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requiresAuth === true) {
    const token = localStorage.getItem("auth-token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      return { message: "No token found", ok: false };
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return { message: data?.message || data.error, ok: false };
    }

    return data;
  } catch (err) {
    console.error("📡 Fetch error:", err);

    return { message: "Network error", ok: false };
  }
}
