
import mongoose, { Schema } from "mongoose";
const Curse = require("./curseSchema");
const potionAntidoteSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  value: { type: Number },
  min_lvl: { type: Number },
  recovery_effect: { type: Schema.Types.ObjectId, ref: Curse}
});
module.exports = mongoose.models.PotionAntidote || mongoose.model('PotionAntidote', potionAntidoteSchema);
