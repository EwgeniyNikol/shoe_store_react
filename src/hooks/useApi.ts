const API_URL = 'http://localhost:7070/api';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }
  return res.json();
}
