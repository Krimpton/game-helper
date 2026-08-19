const BASE_URL = "http://localhost:3000/api/games";


// =========================================================
// CACHE
// =========================================================

let gamesCache: any[] | null = null;

let gamesCachePage = 0;

let loadingPromise: Promise<any[]> | null = null;


// =========================================================
// LOAD SINGLE PAGE
// =========================================================

async function fetchPage(page: number) {

  const res = await fetch(
    `${BASE_URL}?page=${page}`
  );


  if (!res.ok) {

    throw new Error(
      `Failed to fetch games page ${page}`
    );

  }


  const data = await res.json();


  return data.results || [];
}


// =========================================================
// LOAD MULTIPLE PAGES
// =========================================================

export async function getGamesUpToPage(
  maxPage = 2
) {

  /*
   * Wenn wir bereits genug Spiele im Cache
   * haben, geben wir diese direkt zurück.
   */

  if (
    gamesCache &&
    gamesCachePage >= maxPage
  ) {

    return gamesCache;

  }


  /*
   * Wenn gerade schon ein Ladevorgang läuft,
   * verwenden wir denselben Request.
   *
   * Dadurch werden nicht mehrere parallele
   * Ladeprozesse gestartet.
   */

  if (loadingPromise) {

    return loadingPromise;

  }


  loadingPromise = (async () => {

    try {

      const requests = [];


      /*
       * Alle benötigten Seiten laden.
       */

      for (
        let page = 1;
        page <= maxPage;
        page++
      ) {

        requests.push(
          fetchPage(page)
        );

      }


      /*
       * Promise.allSettled sorgt dafür,
       * dass ein einzelner fehlgeschlagener
       * Request nicht alles kaputt macht.
       */

      const results =
        await Promise.allSettled(
          requests
        );


      const successfulPages =
        results

          .filter(
            (result) =>
              result.status === "fulfilled"
          )

          .map(
            (result) =>
              result.status === "fulfilled"
                ? result.value
                : []
          );


      /*
       * Alle erfolgreich geladenen Seiten
       * zusammenführen.
       */

      const games =
        successfulPages.flat();


      /*
       * Doppelte Spiele entfernen.
       */

      const uniqueGames =
        Array.from(
          new Map(
            games.map(
              (game) => [
                game.id,
                game
              ]
            )
          ).values()
        );


      /*
       * Cache speichern.
       */

      gamesCache =
        uniqueGames;

      gamesCachePage =
        maxPage;


      console.log(
        `Loaded ${uniqueGames.length} games from ${maxPage} pages`
      );


      return uniqueGames;

    } finally {

      loadingPromise = null;

    }

  })();


  return loadingPromise;

}


// =========================================================
// SINGLE PAGE
// =========================================================

export async function getGamesByPage(
  page: number
) {

  return fetchPage(page);

}


// =========================================================
// SEARCH
// =========================================================

export async function searchGames(
  query: string,
  page = 1
) {

  const res = await fetch(
    `${BASE_URL}?search=${encodeURIComponent(
      query
    )}&page=${page}`
  );


  if (!res.ok) {

    throw new Error(
      "Failed to search games"
    );

  }


  const data =
    await res.json();


  return data.results || [];

}