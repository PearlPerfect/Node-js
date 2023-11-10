const { User } = require('../Models/model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {handleError} = require("../middlewares/signUpError")



const getAllUsers = async (req, res) => {

    const user = await User.find()
    res.status(200).json(user)
}

const getSingleUser = (req, res) => {
    let userId = req.params.id;
    User.findById(userId).then(user => {
        res.status(200).json(user)
    })
}
const form = async (req, res) => {
    res.json("hello");

}

const addUser = async (req, res) => {
    // console.log(req)
    const email = req.body.email
    let user = await User.findOne({email });
    if(user){
        res.status(400).json("Email already in use, try again with another email")
    }
    else{
        
        try{
        const hashedpassword = await bcrypt.hash(req.body.password, 16);

         user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
        role: req.body.role,
    })
    await user.save()
        .then(result =>{
            res.status(201).json("Data saved successfully");
        })
    }
    catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})
     }
        
    }

}

const login = async (req, res)=>{

    const email = req.body.email
    let user = await User.findOne({email });
    if(!user){
        res.status(400).json("Email not in use, try again with a registered email")
    }

    else{
        try{
            const password = req.body.password
             const samePassword = await bcrypt.compare(password, user.password);
        if (!samePassword ){
            res.status(400).json( 'Invalid Password')
        }
        else{
            jwt.sign({user:user}, "mySecret", {expiresIn: 60*1000},(err, token)=>{
                   res.json({
                        token: token
                    }
                    )
            })
            // res.status(200).json( 'Login successful')
        }
    }
    catch(err){
       const errors = handleError(err)
       res.status(400).json({errors})
    }
}
   

}
module.exports = { getAllUsers, getSingleUser, addUser, form, login }