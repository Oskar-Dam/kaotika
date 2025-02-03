import mongoose from "mongoose";

const potionEnhancerSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  type: { type: String },
  value: { type: Number },
  duration: { type: Number },
  modifiers: {
    hit_points: { type: Number },
    intelligence: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    insanity: { type: Number },
    charisma: { type: Number },
    strength: { type: Number },
  },
  min_lvl: { type: Number },
});

module.exports = mongoose.models.PotionEnhancer || mongoose.model('PotionEnhancer', potionEnhancerSchema);