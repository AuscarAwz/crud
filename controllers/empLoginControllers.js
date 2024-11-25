const express = require('express');
const empLoginModel = require('../model/loginModel.js');
const routerControl = express.Router();


exports.CreateUser = async (req, res) => {
    try {
    
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(422).json({message: 'Username & password fields are required'})
    }
    
    // Check if user with the same username or password already exists
    const existingUser = await empLoginModel.findOne({ $or: [{ username }, { password }] });

    if (existingUser) {
        return res.status(400).json({
            message: existingUser.username === username
                ? "User with this username already exists."
                : "User with this password already exists."
        });
    }

    /*const existingUserName = await empLoginModel.findOne({ username });
    
    if (existingUserName) {
        return res.status(400).json({ message: "User with this username already exists." });
    }

    const existingPassword = await empLoginModel.findOne({ password });
    
    if (existingPassword) {
        return res.status(400).json({ message: "User with this password already exists." });
    }*/


    const userValue = new empLoginModel({ username, password });
    
    console.log(userValue);
    
    const userDetails = await userValue.save();
    
    res.send(userValue)
    
} catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const usersRecords = await empLoginModel.find();
        console.log(usersRecords);
        return res.status(200).json(usersRecords)
    } catch (error) {
        return res.status(400).json({message: error.message})
}
}

exports.GetUserValidation = async (req, res) => {
    try {
        const { username, password } = req.body;

        if( !username || !password ) {
            return res.status(422).json({message: 'Username & password fields are required'})
        }

        if( username && password ) {
            const existingUser = await empLoginModel.findOne({ username, password });
            console.log(existingUser);
            if (existingUser) {
                return res.status(200).json({message: 'User logged in successfully'})
            } else {
                return res.status(400).json({message: 'Invalid username or password'})
            }
        }
        
        

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}