export const swrFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorResponse = await res.json();
    return errorResponse;
  }

  return res.json();
};
