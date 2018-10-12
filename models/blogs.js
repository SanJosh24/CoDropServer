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

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;