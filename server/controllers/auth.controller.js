import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import generateTokenandSetCookie from "../utils/generateToken.js";

async function login(req,res) {
   try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Credentials"})
        }

        generateTokenandSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            status: "Login Successful!"
        })

   } catch (error) {
        console.log("Error in signup controller", error.message)    
        res.status(500).json({error: "Internal Server Error" + error.message})
   }
}

async function logout(req,res) {
    try{
        res.cookie("jwt","", {maxAge: 0})
        res.status(200).json({message: "Log out successful!"})
    } catch(error) {
        console.log("Error is logout controller", error.message);
        res.status(500).json({error: "Internal Server Error" + error.message})
    }
}

async function signup(req,res) {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if (password != confirmPassword){
            return res.status(400).json({ message: "Password didn't match"})
        }

        const user = await User.findOne({username})
        
        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic =  `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            //JWT Token
            generateTokenandSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser.id,
                fullname: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                status: "User creation Successful!"
            })
        } else {
            res.status(400).json({ error: "Invalid user data!" })
        }

    } catch(error) {
        console.log("Error is signup controller", error.message)    
        res.status(500).json({error: "Internal Server Error" + error.message})
    }
}

export { login, logout, signup };
