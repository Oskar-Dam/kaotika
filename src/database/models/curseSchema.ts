import mongoose from "mongoose";

const curseSchema = new mongoose.Schema({
    modifiers: {
        hit_points: { type: Number },
        intelligence: { type: Number },
        dexterity: { type: Number },
        insanity: { type: Number },
        charisma: { type: Number },
        constitution: { type: Number },
        strength: { type: Number }
      },
    name: { type: String },
    description: { type: String },
    type: { type: String },
    antidote_effects: [{ type: String }],
    poison_effects: [{ type: String }]
  });
module.exports = mongoose.models.Disease || mongoose.model('Disease', curseSchema);
