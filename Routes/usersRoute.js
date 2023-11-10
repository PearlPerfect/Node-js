const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser, addUser, form, login} = require('../Controllers/userControllers')
const {handleAuth } = require("../middlewares/auth")


router.get('/', handleAuth, getAllUsers);

router.get('/register', form);

router.post('/register', addUser);

router.get('/userlogin', form);

router.post('/userlogin', login)









module.exports = router