const router = require("express").Router();
const Post = require("../models/Posts.js");

//create a post
router.post("/", async (req, res) => {
  const newpost = new Post(req.body);
  try {
    const savepost = await newpost.save();
    res.status(200).json(savepost);
  } catch (err) {
    console.log(err);
  }
});

//delete a post

router.put("/:id", async (req, res) => {
  const post = Post.findById(req.params.id);
  try {
    if (post.user_id === req.body.user_id) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json("u can update only yours");
  }
});

// get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
