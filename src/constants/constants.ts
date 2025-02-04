export const GRID_NUMBER = 64;
export const EXP_POINTS = 1750;
export const LOCAL_BASE_URL = "localhost:3000"
export const ACOLYTE_EMAIL = "@ikasle.aeg.eus"
export const MENTOR_EMAIL = "@aeg.eus"
export const SERVER_URL = "https://kaotika-server.fly.dev"

export const PROGRESS_LABEL = "text-darkSepia tracking-wider text-2xl"
export const PROGRESS_VALUE = "text-2xl text-medievalSepia/100"

export const CHARISMA = "charisma"
export const CONSTITUTION = "constitution"
export const DEXTERITY = "dexterity"
export const INSANITY = "insanity"
export const INTELLIGENCE = "intelligence"
export const STRENGTH = "strength"

export const MERCHANT_MESSAGES = {
  removeItem: ['Better you add more products to that cart!',],
  removeAllItems: ['Time to fill that cart once again!',], //Not implemented
  buyItem: ['Please come again!', 'Thanks for your coins... Idiot...'],
  buyAllItems: ['buyAllItems1', 'buyAllItems2'], //Not implemented
  sellItem: ["It's a pleasure to make deals with you. Please come again.", "Next time, try offering me more valuable items", "Don't you have any unique item for me?"],
  equipmentShop: ['Best gear you will ever find', 'We do not sell uniques to your kind do not be absurd.'],
  MagicShop: ['Best ingredients that you will ever find', "Someone once told me, there's a tower with special ingredients which cannot be find elsewhere... Never saw him again"],
  addToCart: ["You won't regret it", 'The cart feels lonely... add more products... NOW!!!'],
  inssufficientMoney: ['Not Enough Money', 'HAHAHAHA Are You Poor? Because You can not afford that!'], //Not implemented
  alreadyInCart: ['You have that equipment already added to the cart.', 'Are you blind? You can not add this again!'],//Not implemented
  selectNewProduct: ['That fits you well... You Should buy it.', 'It is like if you were stealing me with that price. Do a favor to yourself and buy it.'],
  selectNewSellProduct: ['You better not show me garbage.', "You don't want that? I'll buy it.", 'Are you trying to scam me? Better not...'],
  changeShopTab: ['Perhaps this is more of your liking.', 'If you look it... YOU BUY IT!'],
  loading: ['PLEASE WAIT IM THINKING', "I'm counting the coins please wait a moment."],
  errorTransaction: ['Something happened while making our deal. Please try again.'],
  buyTab: ["Don't waste my time and buy something already!"],
  sellTab: ['You looking to sell some of your items? You came to the right spot!', "Someone told you that I buy to low prices? Tell me their names so you won't hear them again... hehehe"]
};

export const defensiveEquipmentSortOptions = [
  { key: 'gold', label: 'Gold' },
  { key: 'min_lvl', label: 'Level' },
  { key: 'defense', label: 'Defense' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'insanity', label: 'Insanity' },
  { key: 'charisma', label: 'Charisma' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'strength', label: 'Strength' },
];

export const ofensiveEquipmentsSortOptions = [
  { key: 'gold', label: 'Gold' },
  { key: 'min_lvl', label: 'Level' },
  { key: 'base_porcentage', label: 'Base Porcentage' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'insanity', label: 'Insanity' },
  { key: 'charisma', label: 'Charisma' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'strength', label: 'Strength' },
];

export const accesoriesSortOptions = [
  { key: 'gold', label: 'Gold' },
  { key: 'min_lvl', label: 'Level' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'insanity', label: 'Insanity' },
  { key: 'charisma', label: 'Charisma' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'strength', label: 'Strength' },
];

export const ingredientsSortOptions = [
  { key: 'gold', label: 'Gold' },
];

export const inventorySortOptions = [
  { key: 'gold', label: 'Gold' },
];

export const defaultSortOptions = [
  { key: 'gold', label: 'Gold' },
];

export const equipmentCategories = [
  { key: 'weapon', label: 'Weapons' },
  { key: 'shield', label: 'Shields' },
  { key: 'helmet', label: 'Helmets' },
  { key: 'armor', label: 'Armors' },
  { key: 'boot', label: 'Boots' },
  { key: 'ring', label: 'Rings' },
  { key: 'artifact', label: 'Artifacts' },
];

export const magicalCategories = [
  { key: 'ingredient', label: 'Ingredients' },
  { key: 'container', label: 'Containers' },
];

export const shopOptions = [
  { key: 'equipment', label: 'Equipment' },
  { key: 'magical', label: 'Magical Stuff' },
];