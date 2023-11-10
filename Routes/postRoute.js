const express = require('express');
const router = express.Router();
const {getPostComment, addComment} = require("../Controllers/commentController");
const {handleAuth } = require("../middlewares/auth")
const {getAllPost, addPost, singlePost, getPostToUpdate, updatePost, deletePost} = require('../Controllers/postController')


router.get("/", getAllPost )

router.post("/addpost", handleAuth, addPost)

router.get("/:id", singlePost)

// router.get("/edit/:id", getPostToUpdate);

router.get("/:id/comments", getPostComment);

router.post("/:id/comments", handleAuth, addComment);

router.put("/:id", handleAuth, updatePost);

router.delete("/:id", deletePost)



module.exports = router