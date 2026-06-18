const BASE_URL = "http://localhost:3000/api/games";

/**
 * Sicheres Fetching (verhindert Crashs)
 */
async function fetchPage(page: number) {
  const res = await fetch(`${BASE_URL}?page=${page}`);
  const data = await res.json();
  return data.results || [];
}

/**
 * 🔥 Lädt mehrere Seiten automatisch (Infinite-style)
 */
export async function getGamesUpToPage(maxPage = 2) {
  const requests = [];

  for (let page = 1; page <= maxPage; page++) {
    requests.push(fetchPage(page));
  }

  const pages = await Promise.all(requests);

  return pages.flat();
}

/**
 * Einzelne Seite (falls du sie brauchst)
 */
export async function getGamesByPage(page: number) {
  return fetchPage(page);
}

/**
 * Suche
 */
export async function searchGames(query: string) {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  const data = await res.json();
  return data.results || [];
}