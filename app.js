const express = require('express');
const mongoose = require('mongoose');
// const methodOverride = require('method-override');
// const session = require('express-session');
// const cookieParser =  require('cookie-parser');
// const MongoStore = require('connect-mongo');
//const crypto = require('crypto');


const connectDBRecords = require('./server/config/db.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mongoose.connect("mongodb+srv://askarsahib11:admin@cluster0.9ie73.mongodb.net/");
// const userSchema =  mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     age: Number
// })
//  const userModel = mongoose.model("employee ", userSchema);
//  const user1 =  userModel({
//     name: "Syed Mohamed Auscar",
//     email: "auscar@ideassion.com",
//     password: "12345",
//     age: 26
//  })
// user1.save();
const PORT = 8000 || process.env.PORT;


connectDBRecords(); //connectDB();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cookieParser());
// app.use(methodOverride('_method'));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI
//     }),
//     //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
//   }));


app.use('/products', require('./routes/productRoute'));
app.use('/Emprecord', require('./routes/empRoute.js') )

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
//app.listen(8000, () => console.log(`Server start on pot 8000`))
