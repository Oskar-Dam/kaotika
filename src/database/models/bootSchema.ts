import mongoose from "mongoose";
const Modifier = require("./modifierSchema");

const bootSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  value: { type: Number },
  defense: { type: Number },
  modifiers: { type: Modifier },
  min_lvl: { type: Number },
  isUnique: { type: Boolean },
  isActive: { type: Boolean },
});

module.exports = mongoose.models.Boot || mongoose.model('Boot', bootSchema);
