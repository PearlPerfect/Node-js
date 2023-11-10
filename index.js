const PORT = 7003;
const express = require('express');
const ejs = require('ejs');
const mongoose = require("mongoose");
// const authRoutes = require("./Routes/authRoute")
const mongodbURL= "mongodb+srv://perfectpearl2030:api@restfulapi.khuvahn.mongodb.net/";



mongoose.connect(mongodbURL, {})
.then(() => {
    console.log('Database Is up and connected successfully')
}).catch(() => {
    console.log('connection fail')
}); 

const app = express();

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', require('./Routes/usersRoute'));
app.use('/posts', require('./Routes/postRoute'));
app.use('/comments', require('./Routes/commentsRoute'));
// app.use(authRoutes)


app.listen(PORT, ()=>{
    console.log(`listening to http://localhost:${PORT}`)
})