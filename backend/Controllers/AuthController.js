const UserModel = require('../model/UserModel');
const {createSecretToken} = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

module.exports.Signup = async (req, res, next) => {
    try{
        const{email, password, username} = req.body;
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.json({message: "User already exists"});
        }
        const user = await UserModel.create({email, password, username});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({message: "User signed in successfully" , success: true, user});
        next();
    }
    catch(err){
        console.error(err);
    }
}