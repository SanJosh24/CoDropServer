const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const clanSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  users: [{ type: Schema.Types.ObjectId }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const clan = mongoose.model("clan", clanSchema);

module.exports = clan;