const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "http://localhost:3001/api/v1";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };

  const init: RequestInit = { method, headers };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (networkErr) {
    throw new ApiError(
      "Network error — the server may not be running.",
      "NETWORK_ERROR",
      0
    );
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    if (!response.ok) {
      throw new ApiError(response.statusText, "PARSE_ERROR", response.status);
    }
    return undefined as unknown as T;
  }

  if (!response.ok) {
    const err = json as { error?: { code?: string; message?: string } };
    const message =
      err?.error?.message ?? `Request failed with status ${response.status}`;
    const code = err?.error?.code ?? "REQUEST_FAILED";
    throw new ApiError(message, code, response.status);
  }

  return json as T;
}

export const api = {
  get<T>(path: string): Promise<T> {
    return request<T>("GET", path);
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>("POST", path, body);
  },
  put<T>(path: string, body?: unknown): Promise<T> {
    return request<T>("PUT", path, body);
  },
  del<T>(path: string): Promise<T> {
    return request<T>("DELETE", path);
  },
};
