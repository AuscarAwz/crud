const express = require('express');
const empLoginModel = require('../model/loginModel.js');
const bcrypt = require('bcryptjs');
const routerControl = express.Router();


exports.CreateUser = async (req, res) => {
    try {
    
    const { username, password } = req.body;

    const passwordbcrypt = await bcrypt.hash(password, 10);

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


    const userValue = new empLoginModel({ username, password, passwordbryt: passwordbcrypt }); //, passwordbryt: passwordbcrypt
    
    console.log(userValue);
    
    const userDetails = await userValue.save();
    
    //res.send(userValue);

    return res.status(200).json({message: 'User created successfully',name:userDetails.username, password:userDetails.password, passwordbryt:userDetails.passwordbryt}) //, passwordbryt:userDetails.passwordbryt
    
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

exports.GetUsersById = async (req, res) => {
    try {
        //const usersRecordsById = await empLoginModel.find( empLoginModel => empLoginModel._id ===  req.params._id );
        const usersRecordsById = await empLoginModel.findById(req.params._id);;
        console.log(usersRecordsById);

        if(!usersRecordsById) {
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json(usersRecordsById)
    } catch (error) {
        return res.status(400).json({message: error.message})
}
}

exports.GetUserValidation = async (req, res) => {
    try {
        const { username, password } = req.query;
        


        if( !username || !password ) {
            return res.status(422).json({message: 'Username & password fields are required'})
        }

        if( username && password ) {
            const existingUser = await empLoginModel.findOne({ username, password });
            console.log(existingUser);
            if (existingUser) {
                return res.status(200).json({message: `${existingUser.username} User logged in successfully `,name:existingUser.username, password:existingUser.password})
            } else {
                return res.status(400).json({message: 'Invalid username or password'})
            }
        }
        } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// exports.UpdateLoginUserById = async (req, res) => {
//     try {
//         const { username, password, passwordbryt } = req.body;
//         const updatepasswordbcrypt = await bcrypt.hash(password, 10);
//         const userId = req.params._id;
//     //const { passwordbryt } = req.body

//     //const updateEmp = await empLoginModel.findOneAndUpdate(empLoginModel => empLoginModel._id == req.params._id)
//     const updateEmp = await empLoginModel.findOne({ _id: userId })
    
//     console.log(updateEmp);
    
//     if(!updateEmp) {
//         return res.status(404).json({message: 'Product not found'})
//     }

//     //const {username, password, passwordbryt} = req.body

//     if(username) {
//         empLoginModel.username = req.body.username
//     }
//     if(password) {
//         empLoginModel.password = req.body.password
//     }

//     if(passwordbryt) {
//         empLoginModel.passwordbryt = updatepasswordbcrypt
//     }
    
//     // if('active' in req.body) {
//     //     product.active = active
//     // }
//     const updateEmpoyee = await updateEmp.save();
//     return res.status(200).json({message: 'Product updated successfully',name:updateEmpoyee.username, password:updateEmpoyee.password, passwordbryt:updateEmpoyee.passwordbryt})

// } catch (error) {
//     return res.status(400).json({ message: error.message });
// }

// }