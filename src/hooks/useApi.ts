import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "@/lib/api";

export interface UseApiOptions {
  /** Skip the initial fetch. Useful when the URL is conditionally built. */
  skip?: boolean;
}

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | Error | null;
  refetch: () => void;
}

/**
 * Generic data-fetching hook.
 *
 * @param url  Path relative to the API base (e.g. "/blog/posts?page=1").
 *             Changing this value triggers a new fetch.
 * @param options  Optional config (e.g. skip the initial fetch).
 *
 * @example
 * const { data, loading, error, refetch } = useApi<{ data: BlogPost[] }>("/blog/posts");
 */
export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { skip = false } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<ApiError | Error | null>(null);

  // Keep a ref to the current url so we can detect stale responses.
  const urlRef = useRef(url);
  urlRef.current = url;

  // Increment to force a refetch without changing the url.
  const [fetchIndex, setFetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setFetchIndex((i) => i + 1);
  }, []);

  useEffect(() => {
    if (skip) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const currentUrl = url;

    setLoading(true);
    setError(null);

    api
      .get<T>(currentUrl)
      .then((result) => {
        if (!cancelled && urlRef.current === currentUrl) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled && urlRef.current === currentUrl) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, skip, fetchIndex]);

  return { data, loading, error, refetch };
}
