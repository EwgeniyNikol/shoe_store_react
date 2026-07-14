const API_URL = 'https://shoe-store-18si.onrender.com/api';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }
  return res.json();
}
