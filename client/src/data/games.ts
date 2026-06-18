export type Game = {
  id: number;
  name: string;
  image: string;
  genre: string;
  rating: number;
  description: string;
  platforms: string[]
};

export const games: Game[] = [
  {
    id: 1,
    name: "Elden Ring",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1767883716",
    genre: "RPG",
    rating: 9.5,
    description:
      "An open-world action RPG set in the Lands Between. Explore vast regions, battle powerful enemies, and uncover the secrets of the Elden Ring.",
    platforms: ["PC", " ,PS4", " ,PS5", " ,Xbox One", " ,Xbox Series X/S"],
  },
  {
    id: 2,
    name: "Cyberpunk 2077",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxzCP7YhwpNfPutHtgTSjblQPzxbJ9dRHdRAnRkieDWmr2GRtBVBCeubs&s=10",
    genre: "RPG",
    rating: 8.2,
    description:
      "A story-driven open-world RPG set in Night City, where you play as V, a mercenary searching for a unique implant that holds the key to immortality.",
    platforms: ["PC", " ,PS5", " ,Xbox Series X/S", " ,Nintendo Switch 2"],
  },
  {
    id: 3,
    name: "God of War",
    image: "https://gaming-cdn.com/images/products/7325/orig/god-of-war-pc-spiel-steam-europe-cover.jpg?v=1744715989",
    genre: "Action",
    rating: 9.7,
    description:
      "Join Kratos and his son Atreus on an epic journey through the world of Norse mythology filled with gods, monsters, and ancient secrets.",
    platforms: [" PC", " ,PS4", " ,PS5"],
  },
  {
    id: 4,
    name: "Hogwarts Legacy",
    image: "https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/hogwartslegacy/2x1_NSwitch2_HogwartsLegacy_image1600w.jpg",
    genre: "Adventure",
    rating: 8.8,
    description:
      "Experience life as a student at Hogwarts in the 1800s and discover magical creatures, spells, and mysteries in an open-world wizarding adventure.",
    platforms: [" PC", " ,PS5", " ,Xbox Series X/S", " ,Nintendo Switch"],
  },
  {
    id: 5,
    name: "Red Dead Redemption 2",
    image: "https://gaming-cdn.com/images/products/5679/orig/red-dead-redemption-2-pc-spiel-rockstar-cover.jpg?v=1713793245",
    genre: "Adventure",
    rating: 9.8,
    description:
      "An epic tale of life in America at the dawn of the modern age, following outlaw Arthur Morgan and the Van der Linde gang.",
    platforms: [" PC", " ,PS4", " ,Xbox One"],
  },
  {
    id: 6,
    name: "The Witcher 3",
    image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_TheWitcher3WildHunt_enGB.jpg",
    genre: "RPG",
    rating: 9.6,
    description:
      "Play as Geralt of Rivia, a monster hunter searching for his adopted daughter while facing a supernatural threat known as the Wild Hunt.",
    platforms: [" PC", " ,PS4", " ,PS5", " ,Xbox One", " ,Xbox Series X/S", " ,Nintendo Switch"],
  },
  {
    id: 7,
    name: "Spider-Man 2",
    image: "https://static.digitecgalaxus.ch/im/Files/7/5/4/1/2/6/6/9/MSM2_Story_Duo_4k_Legal_202321.png?impolicy=teaser&resizeWidth=700&resizeHeight=350",
    genre: "Action",
    rating: 9.0,
    description:
      "Swing through New York City as Peter Parker and Miles Morales while facing powerful new villains and protecting the city.",
    platforms: [" PS5", " ,PC"],
  },
  {
    id: 8,
    name: "Hades",
    image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Hades_image1600w.png",
    genre: "Strategy",
    rating: 9.4,
    description:
      "Fight your way out of the Underworld as Zagreus in this fast-paced roguelike featuring Greek mythology and endless replayability.",
    platforms: ["PC", " ,PS4", " ,PS5", " ,Xbox One", " ,Xbox Series X/S", " ,Nintendo Switch"],
  },
  {
    id: 9,
    name: "Baldur's Gate 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpzLryG5_YUtgltRU5SuuoxTWR_IOL-cF1yQiq2gbG5JWHhOtu5gApcMX&s=10",
    genre: "RPG",
    rating: 9.9,
    description:
      "A party-based RPG set in the Dungeons & Dragons universe where every choice shapes your story and the fate of the world.",
    platforms: ["PC", " ,PS5", " ,Xbox Series X/S"],
  },
  {
    id: 10,
    name: "Assassin's Creed Valhalla",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPmFhVFP8aQeC8mtPLEJFFYx6sD9E78sowcwG2pPvDYVyEqGN87KOS3HT&s=10",
    genre: "Action RPG",
    rating: 8.5,
    description:
      "Lead Viking raids across England as Eivor, build settlements, forge alliances, and shape your legend.",
    platforms: ["PC", " ,PS4", " ,PS5", " ,Xbox One", " ,Xbox Series X/S"],
  },

  {
  id: 11,
  name: "Resident Evil 4",
  image: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_ResidentEvil4.jpg",
  genre: "Horror",
  rating: 9.4,
  description:
    "Special agent Leon S. Kennedy travels to a remote European village to rescue the U.S. president's daughter and uncover a sinister cult.",
  platforms: ["PC", " ,PS4", " ,PS5", " ,Xbox Series X/S", " ,iOS"],
},

{
  id: 12,
  name: "Dead Space",
  image: "https://cdn1.epicgames.com/spt-assets/561519f67a624ff9b235797a5a67f6d4/dead-space-2008-1g7nk.jpg?resize=1&w=480&h=270&quality=medium",
  genre: "Horror",
  rating: 9.1,
  description:
    "Engineer Isaac Clarke boards a mining spaceship overrun by terrifying creatures and must fight to survive while uncovering the truth behind the outbreak.",
  platforms: ["PC", " ,PS5", " ,Xbox Series X/S"],
},

{
  id: 13,
  name: "Outlast",
  image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/238320/capsule_616x353.jpg?t=1666817106",
  genre: "Horror",
  rating: 8.8,
  description:
    "Investigative journalist Miles Upshur explores an abandoned psychiatric hospital where disturbing experiments have turned its inhabitants into deadly threats.",
  platforms: ["PC", " ,PS4", " ,Xbox One", " ,Nintendo Switch"],
},

{
  id: 14,
  name: "Alien: Isolation",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwpgHUzUDWSBKUBkb0yQuVVbSt69Uoegl80ao_JyqAWyAhQ9fthGzD-7W&s=10",
  genre: "Horror",
  rating: 9.0,
  description:
    "Amanda Ripley searches for answers about her mother's disappearance while being hunted by a relentless Xenomorph aboard a space station.",
  platforms: ["PC", " ,PS4", " ,Xbox One", " ,Nintendo Switch", " ,iOS", " ,Android"],
},

{
  id: 15,
  name: "Silent Hill 2",
  image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2124490/capsule_616x353.jpg?t=1744248682",
  genre: "Horror",
  rating: 9.6,
  description:
    "After receiving a letter from his deceased wife, James Sunderland travels to the mysterious town of Silent Hill in search of the truth.",
  platforms: ["PC", " ,PS5"],
},

{
  id: 16,
  name: "Civilization VII",
  image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1295660/3e55c78cf367f4e600f516bd6218b7580661a385/capsule_616x353_alt_assets_5.jpg?t=1779464366",
  genre: "Strategy",
  rating: 8.7,
  description:
    "Build an empire that stands the test of time by leading a civilization through different eras, researching technologies, and competing with rival leaders.",
  platforms: ["PC", " ,PS5", " ,Xbox Series X/S", " ,Nintendo Switch"],
},

{
  id: 17,
  name: "Age of Empires IV",
  image: "https://www.climaxstudios.com/images/custom/d3/8c9aac9443bc501e6895a812b28a53/w1090/h610/fx50.8/fy41.9/wpopng/images/uploads/d38c9aac9443bc501e6895a812b28a53.webp",
  genre: "Strategy",
  rating: 8.9,
  description:
    "Lead powerful civilizations through the Middle Ages, gather resources, construct cities, and command armies in large-scale historical battles.",
  platforms: ["PC", " ,Xbox Series X/S"],
},
];