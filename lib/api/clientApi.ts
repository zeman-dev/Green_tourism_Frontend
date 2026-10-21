export type QueryParams = Record<string, string | number | boolean | null | undefined>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function clientApi<T>(endpoint: string, params?: QueryParams): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  const url = new URL(endpoint, API_BASE_URL);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Something went wrong`);
  }

  return response.json() as Promise<T>;
}
