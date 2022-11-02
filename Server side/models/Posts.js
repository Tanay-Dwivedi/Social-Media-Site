const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 300,
    },
    likes: {
      type: Array,
      default: [],
    },
    img: {
      type: String,
    },
    comments: {
      type: Array,
      default: [{}],
    },
    tags: {
      type: Array,
      default: [{}],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
