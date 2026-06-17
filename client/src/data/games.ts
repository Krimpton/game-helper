export type Game = {
  id: number;
  name: string;
  image: string;
  genre: string;
  rating: number;
};

export const games: Game[] = [
  {
    id: 1,
    name: "Elden Ring",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1767883716",
    genre: "RPG",
    rating: 9.5,
  },
  {
    id: 2,
    name: "Cyberpunk 2077",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxzCP7YhwpNfPutHtgTSjblQPzxbJ9dRHdRAnRkieDWmr2GRtBVBCeubs&s=10",
    genre: "Action RPG",
    rating: 8.2,
  },
  {
    id: 3,
    name: "God of War",
    image: "https://gaming-cdn.com/images/products/7325/orig/god-of-war-pc-spiel-steam-europe-cover.jpg?v=1744715989",
    genre: "Action",
    rating: 9.7,
  },
  {
    id: 4,
    name: "Hogwarts Legacy",
    image: "https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/hogwartslegacy/2x1_NSwitch2_HogwartsLegacy_image1600w.jpg",
    genre: "Adventure",
    rating: 8.8,
  },
  {
    id: 5,
    name: "Red Dead Redemption 2",
    image: "https://gaming-cdn.com/images/products/5679/orig/red-dead-redemption-2-pc-spiel-rockstar-cover.jpg?v=1713793245",
    genre: "Open World",
    rating: 9.8,
  },
  {
    id: 6,
    name: "The Witcher 3",
    image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_TheWitcher3WildHunt_enGB.jpg",
    genre: "RPG",
    rating: 9.6,
  },
  {
    id: 7,
    name: "Spider-Man 2",
    image: "https://static.digitecgalaxus.ch/im/Files/7/5/4/1/2/6/6/9/MSM2_Story_Duo_4k_Legal_202321.png?impolicy=teaser&resizeWidth=700&resizeHeight=350",
    genre: "Action",
    rating: 9.0,
  },
  {
    id: 8,
    name: "Hades",
    image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Hades_image1600w.png",
    genre: "Roguelike",
    rating: 9.4,
  },
  {
    id: 9,
    name: "Baldur's Gate 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpzLryG5_YUtgltRU5SuuoxTWR_IOL-cF1yQiq2gbG5JWHhOtu5gApcMX&s=10",
    genre: "RPG",
    rating: 9.9,
  },
  {
    id: 10,
    name: "Assassin's Creed Valhalla",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPmFhVFP8aQeC8mtPLEJFFYx6sD9E78sowcwG2pPvDYVyEqGN87KOS3HT&s=10",
    genre: "Action RPG",
    rating: 8.5,
  },
];