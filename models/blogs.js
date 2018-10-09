const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  likes: Array,
  public: Boolean
}, {
  timestamps: {
    createdAt: "created_at",
  }
});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;