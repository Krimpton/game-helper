const API_URL = "http://localhost:3000";


// =========================================================
// TYPES
// =========================================================

export type LibraryStatus =
  | "wishlist"
  | "want_to_play"
  | "playing"
  | "completed"
  | "dropped";


export interface LibraryGame {
  id: number; // ID des Library-Datensatzes
  gameId: number; // IGDB-ID des Spiels

  title: string;
  image: string | null;

  rating: number | null;
  released: string | null;

  status: LibraryStatus;

  personalRating?: number | null;
  note?: string | null;
}


// =========================================================
// NORMALIZE BACKEND GAME
// =========================================================

function normalizeLibraryGame(
  game: any
): LibraryGame {

  return {
    id: game.id,

    gameId: game.rawgGameId,

    title: game.title,

    image: game.image || null,

    rating:
      game.rawgRating !== undefined
        ? game.rawgRating
        : null,

    released:
      game.released || null,

    status:
      game.status || "wishlist",

    personalRating:
      game.personalRating ?? null,

    note:
      game.note ?? null,
  };

}


// =========================================================
// GET LIBRARY
// =========================================================

export async function getLibrary(): Promise<LibraryGame[]> {

  const response = await fetch(
    `${API_URL}/api/library`,
    {
      method: "GET",

      credentials: "include",
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Failed to load game library"
    );

  }


  return (
    data.games || []
  ).map(normalizeLibraryGame);

}


// =========================================================
// ADD GAME
// =========================================================

export async function addGameToLibrary(
  game: {
    id: number;
    title: string;
    image?: string | null;
    rating?: number | null;
    released?: string | null;
  },
  status: LibraryStatus
): Promise<LibraryGame> {

  const response = await fetch(
    `${API_URL}/api/library`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        gameId: game.id,

        title: game.title,

        image:
          game.image || null,

        rating:
          game.rating ?? null,

        released:
          game.released || null,

        status,
      }),
    }
  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Failed to add game to library"
    );

  }


  return normalizeLibraryGame(
    data.game
  );

}


// =========================================================
// UPDATE GAME
// =========================================================

export async function updateLibraryGame(
  libraryId: number,
  data: {
    status?: LibraryStatus;
    personalRating?: number | null;
    note?: string | null;
  }
): Promise<LibraryGame> {

  const response = await fetch(
    `${API_URL}/api/library/${libraryId}`,
    {
      method: "PUT",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );


  const responseData =
    await response.json();


  if (!response.ok) {

    throw new Error(
      responseData.message ||
      "Failed to update library game"
    );

  }


  return normalizeLibraryGame(
    responseData.game
  );

}


// =========================================================
// REMOVE GAME
// =========================================================

export async function removeGameFromLibrary(
  libraryId: number
): Promise<void> {

  const response = await fetch(
    `${API_URL}/api/library/${libraryId}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Failed to remove game from library"
    );

  }

}