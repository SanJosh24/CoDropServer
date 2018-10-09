const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const passport = require("passport");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: "blogs" }],
  clan: Array,
  favoritedBy: [{ type: Schema.Types.ObjectId}],
  favoriteUsers: [{ type: Schema.Types.ObjectId}],
  hierarchy: String,
  imageurl: String,
  messages: [{ type: Schema.Types.ObjectId}]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;