interface FetchOptions<T> {
  endpoint: string;
  body?: T;
  requiresAuth?: boolean;
}

export async function FetchingData<TRequest = unknown, TResponse = unknown>({
  endpoint,
  body,
  requiresAuth = false,
}: FetchOptions<TRequest>): Promise<{ data?: TResponse; error?: string }> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requiresAuth === true) {
    const token = localStorage.getItem("auth-token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      return { error: "No token found" };
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
      return { error: data?.message || data.error };
    }

    return { data };
  } catch (err) {
    console.error("📡 Fetch error:", err);

    return { error: "Network error" };
  }
}
