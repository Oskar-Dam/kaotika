import mongoose, { Schema } from "mongoose";
const Armor = require("./armorSchema");
const Artifact = require("./artifactSchema");
const Boot = require("./bootSchema");
const Helmet = require("./helmetSchema");
const Ingredient = require("./ingredientSchema");
const Ring = require("./ringSchema");
const Shield = require("./shieldSchema");
const Weapon = require("./weaponSchema");
const Antidote = require("./potionAntidoteSchema");
const Healing = require("./potionHealingSchema");
const Enhancer = require("./potionEnhancerSchema");

const playerSchema = new mongoose.Schema({
  attributes: {
    intelligence: { type: 'Number' },
    dexterity: { type: 'Number' },
    insanity: { type: 'Number' },
    charisma: { type: 'Number' },
    constitution: { type: 'Number' },
    strength: { type: 'Number' }
  },
  equipment: {
    helmet: { type: Schema.Types.ObjectId, ref: Helmet, default: "66d99aac7518eb4990035363" },
    weapon: { type: Schema.Types.ObjectId, ref: Weapon },
    armor: { type: Schema.Types.ObjectId, ref: Armor },
    shield: { type: Schema.Types.ObjectId, ref: Shield, default: "66f27c81c114335cadf45d70" },
    artifact: { type: Schema.Types.ObjectId, ref: Artifact },
    boot: { type: Schema.Types.ObjectId, ref: Boot, default: "66d99a807518eb499003535f" },
    ring: { type: Schema.Types.ObjectId, ref: Ring, default: "66a6d6c8dfbffe7e6503970f" },
    antidote_potion: { type: Schema.Types.ObjectId, ref: Antidote },
    healing_potion: { type: Schema.Types.ObjectId, ref: Healing },
    enhancer_potion: { type: Schema.Types.ObjectId, ref: Enhancer }
  },
  inventory: {
    helmets: [{ type: Schema.Types.ObjectId, ref: Helmet }],
    weapons: [{ type: Schema.Types.ObjectId, ref: Weapon }],
    armors: [{ type: Schema.Types.ObjectId, ref: Armor }],
    shields: [{ type: Schema.Types.ObjectId, ref: Shield }],
    artifacts: [{ type: Schema.Types.ObjectId, ref: Artifact }],
    boots: [{ type: Schema.Types.ObjectId, ref: Boot }],
    rings: [{ type: Schema.Types.ObjectId, ref: Ring }],
    antidote_potions: [{ type: Schema.Types.ObjectId, ref: Antidote }],
    healing_potions: [{ type: Schema.Types.ObjectId, ref: Healing }],
    enhancer_potions: [{ type: Schema.Types.ObjectId, ref: Enhancer }],
    ingredients: [{ type: Schema.Types.ObjectId, ref: Ingredient }]
  },
  _id: { type: 'ObjectId' },
  name: { type: 'String' },
  nickname: { type: 'String' },
  email: { type: 'String' },
  avatar: { type: 'String' },
  classroom_Id: { type: 'String' },
  level: { type: 'Number' },
  experience: { type: 'Number' },
  is_active: { type: 'Boolean' },
  profile: {
    _id: { type: 'ObjectId' },
    name: { type: 'String' },
    description: { type: 'String' },
    image: { type: 'String' },
    attributes: { type: [Array] }
  },
  tasks: { type: 'Array' },
  gold: { type: 'Number' },
  created_date: { type: 'Date' },
});

module.exports = mongoose.models.Player || mongoose.model('Player', playerSchema);