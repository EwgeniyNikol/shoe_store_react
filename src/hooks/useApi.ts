import { API_URL } from '../constants';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }
  return res.json();
}

export function getImageUrl(remoteUrl: string): string {
  const filename = remoteUrl.split('/').pop();
  return `${API_URL}/images/${filename}`;
}