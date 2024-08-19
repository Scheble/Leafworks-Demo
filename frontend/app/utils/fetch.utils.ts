const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchServer = <T>(path: string, init: RequestInit = {}) => {
  const userId = '13226706601490';

  return fetch(`${baseUrl}/${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'user-id': userId,
    },
  }).then((res) => res.json() as T);
};
