const express = require('express');
const { getPostComment, addComment, getAllComment, editComment, getCommentToEdit, deleteComment } = require('../Controllers/commentController');
const router = express.Router();
const {handleAuth} = require("../middlewares/auth")

router.get('/', getAllComment);

// router.get("/:id", getCommentToEdit);

router.put("/:id", handleAuth ,editComment);

router.delete("/:id", handleAuth, deleteComment)




module.exports = router