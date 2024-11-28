
import mongoose from "mongoose";

const ringSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
    type: { type: String},
    image: { type: String},
    value: { type: Number},
    modifiers: {
        intelligence: { type: Number },
        dexterity: { type: Number },
        constitution: { type: Number },
        insanity: { type: Number },
        charisma: { type: Number },
        strength: { type: Number },
      },
    min_lvl: { type: Number},
    isUnique: { type: Boolean},
    isActive: { type: Boolean},
  });

module.exports = mongoose.models.Ring || mongoose.model('Ring', ringSchema);