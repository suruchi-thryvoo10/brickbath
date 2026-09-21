/**
 * Photography is served straight from Unsplash's CDN with explicit crop and
 * quality params so `next/image` can hand the browser an AVIF/WebP variant at
 * exactly the size it needs. Swapping in a real DAM later means changing only
 * this file.
 */
const UNSPLASH = "https://images.unsplash.com";

export function photo(id: string, width = 1400, height = 1750): string {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

/** Wide crop for heroes, banners and landscape cards. */
export function wide(id: string, width = 1920, height = 1080): string {
  return photo(id, width, height);
}

export const img = {
  // Interiors / hero
  heroSuite: "photo-1629079447777-1e605162dc8d",
  heroSpa: "photo-1704428381342-ea9df943619e",
  heroStone: "photo-1620626011761-996317b8d101",
  heroCalm: "photo-1650894622076-e09ab837c502",
  heroWarm: "photo-1638799869566-b17fa794c4de",
  heroMinimal: "photo-1661107259637-4e1c55462428",
  heroLight: "photo-1576698483491-8c43f0862543",
  heroDark: "photo-1682888818704-6dc91e9d7532",
  heroArch: "photo-1631048499052-e6d9f305d2c0",
  heroGreen: "photo-1744869524920-f0efc925b82f",
  heroLinear: "photo-1696987007764-7f8b85dd3033",
  heroSoft: "photo-1564540583246-934409427776",
  heroNiche: "photo-1564540579594-0930edb6de43",
  heroTimber: "photo-1643949719317-4342d8d4031e",
  heroLoft: "photo-1682888818696-906287d759f5",
  heroGallery: "photo-1604769319166-010643ace337",
  heroStudio: "photo-1733426107854-ee00a25d72a7",
  heroTub: "photo-1507652313519-d4e9174996dd",
  heroPlaster: "photo-1642755622932-d1e0cb783dc5",
  heroTerrazzo: "photo-1643949700215-e61cdca053f7",

  // Faucets & showers
  faucetBrass: "photo-1771681278369-e2a5480b8c29",
  faucetChrome: "photo-1542855368-ca6ea825bca2",
  faucetBlack: "photo-1623111771733-d3ab4d26ce41",
  faucetDetail: "photo-1663811396038-7a21d4eef49e",
  faucetWall: "photo-1663811397133-2d1f5addd9d5",
  faucetSpout: "photo-1663811396585-94548d37760f",
  faucetStudio: "photo-1595514535431-1243b02c3b70",
  faucetGold: "photo-1687951276836-06efbfda608b",
  faucetMixer: "photo-1595428774862-a79ab68dbabb",
  showerRain: "photo-1698724624855-e9dbc5a0bddb",
  showerHead: "photo-1561361398-d1f7b6cfee79",
  showerWall: "photo-1697652973421-0d688f661d89",
  showerNiche: "photo-1576678433413-202829a1ab98",
  showerGlass: "photo-1566446896748-6075a87760c1",
  showerSteam: "photo-1571781418606-70265b9cce90",
  showerStone: "photo-1627565685654-f746be384c48",
  showerSpa: "photo-1643081262278-807976f7f2f7",

  // Sanitaryware
  wcWall: "photo-1656646523710-eec180420c2f",
  wcModern: "photo-1587527901949-ab0341697c1e",
  wcSuite: "photo-1589824783837-6169889fa20f",
  wcSmart: "photo-1569597967185-cd6120712154",
  wcDetail: "photo-1656646523723-b660b32dbaaf",
  wcClassic: "photo-1563204719-44395a035bb6",
  wcCompact: "photo-1617850687405-a18454436d77",
  wcStudio: "photo-1560448075-bb485b067938",

  // Basins
  basinStone: "photo-1747227830516-b9643cc377fb",
  basinVessel: "photo-1714399417136-d328f3ea14c7",
  basinRound: "photo-1621953884578-02a3ddb96f46",
  basinMarble: "photo-1700515268323-92e3b3e5377b",
  basinWall: "photo-1542013936693-884638332954",
  basinDouble: "photo-1700515268322-c462b72cdf5a",
  basinConcrete: "photo-1556229167-7ed11195e641",
  basinCeramic: "photo-1521207418485-99c705420785",
  basinCounter: "photo-1627662167500-0ead8e664848",
  basinDetail: "photo-1558522189-435672d37646",

  // Tiles & surfaces
  tileGeo: "photo-1541471943749-e5976783f6c3",
  tileSubway: "photo-1523350165414-082d792c4bcc",
  tileTerrazzo: "photo-1551893478-d726eaf0442c",
  tileHex: "photo-1613124152913-c180d8c1d740",
  tileStack: "photo-1548967199-79324abbe7dc",
  tilePattern: "photo-1642755623141-23b3cb4284aa",
  tileWarm: "photo-1541320779116-ec4a3d4692bc",
  tileWork: "photo-1628602813485-4e8b09442e98",
  marbleWhite: "photo-1566305977571-5666677c6e98",
  marbleVein: "photo-1566041510394-cf7c8fe21800",
  marbleGrey: "photo-1558346648-9757f2fa4474",
  marbleGreen: "photo-1550053808-52a75a05955d",
  marbleWarm: "photo-1551554781-c46200ea959d",
  marbleDark: "photo-1603369425250-b276f2006ec0",

  // Vanities & storage
  vanityOak: "photo-1629078691412-ffc8e1bcfaf6",
  vanityFloat: "photo-1704731529088-19083feb5b43",
  vanityStone: "photo-1763485955998-a9284d042d50",
  vanityTwin: "photo-1763485956310-55f3c0e822d5",
  vanityWood: "photo-1656646523409-46f291d67d2a",
  vanityWhite: "photo-1609879937493-56540300d8cc",
  vanityDark: "photo-1754522711595-84428937b07a",
  vanityOpen: "photo-1696814543768-f8ff4610419a",
  vanityLinen: "photo-1761673271363-6efe71f08d18",
  vanityDrawer: "photo-1763485955497-f5ef5d178698",

  // Bathtubs & wellness
  tubFreestanding: "photo-1631215750638-bdde5f616128",
  tubStone: "photo-1539569304312-b6fffd864948",
  tubWindow: "photo-1644068298141-6333cb147520",
  tubBlack: "photo-1625801882109-032ad88edeb3",
  tubSpa: "photo-1709315610156-fda8311ee3e4",
  tubRound: "photo-1556228578-d3984a1f7e71",
  tubMinimal: "photo-1709315610148-f4b341aed9d4",
  tubLuxe: "photo-1717497043540-d45bf85e5d38",
  tubWood: "photo-1610178169668-530baa052915",
  tubGarden: "photo-1562839938-ef837ead7478",

  // Mirrors & lighting
  mirrorRound: "photo-1631889993959-41b4e9c6e3c5",
  mirrorArch: "photo-1644421439741-712c7fde7e95",
  mirrorLit: "photo-1712214741533-3dd5b8013ca7",
  mirrorFrame: "photo-1733425844220-feab971190ff",
  mirrorPair: "photo-1642755623069-eb720c326553",
  mirrorSlim: "photo-1644916930530-0e4e5afdd20d",
  mirrorGold: "photo-1613849925352-96348d26bc51",
  mirrorStudio: "photo-1663659504863-43dd69a5fda2",

  // Accessories
  towelStack: "photo-1616663717839-2fea42e1a1f6",
  towelRail: "photo-1560185127-bdf08e449371",
  towelSpa: "photo-1639298108944-76a403a7c38d",
  towelFolded: "photo-1688786219616-598ed96aa19d",
  towelLinen: "photo-1651513825857-9fda9d5729fe",
  towelSoft: "photo-1584883767084-938a899585aa",
  towelTray: "photo-1596683705523-eb49540c3934",
  towelBasket: "photo-1580750494923-a06004b452cd",
  towelRobe: "photo-1608651061499-ff031fbf6645",
  towelShelf: "photo-1634831084227-b2415a684173",

  // Team / process / craft
  craftTile: "photo-1523413363574-c30aa1c2a516",
  craftTools: "photo-1625646333826-c30c4e4d73d2",
  craftSite: "photo-1593424469977-77a35fed63c6",
  craftPlan: "photo-1664638413302-d1ca29ac885b",
  craftMeasure: "photo-1613839397604-65fffe7fc3d4",
  craftTeam: "photo-1523413307857-ef24c53571ae",
  craftDetail: "photo-1523413555809-0fb1d4da238d",
  craftWork: "photo-1620653713380-7a34b773fef8",
  craftFinish: "photo-1505798577917-a65157d3320a",
  craftInstall: "photo-1581782834895-b2a5347d0db8",

  // Before states for project reveals
  beforeStrip: "photo-1592302929618-e8a8a8e43dce",
  beforeDated: "photo-1562606795-905ad4a92a67",
  beforeBare: "photo-1566447695072-9f6cc2c84fb6",
  beforeWork: "photo-1724771746699-4c15fc745ce9",
  beforeRaw: "photo-1574088151430-76c8239f290b",
  beforeOld: "photo-1542229336-fcba447980f9",
} as const;

export type ImageKey = keyof typeof img;
