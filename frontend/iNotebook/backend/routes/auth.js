import express from 'express';
const authRouter = express.Router();
import User from '../models/User.js';
import { body, validationResult } from 'express-validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js';
import dotenv from 'dotenv'

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET

// ROUTE 1 :  Create a User using : POST "/api/auth/createuser" . No login required
authRouter.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 5 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    let success = false
    //If ther are errors , return Bad requrst and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Returning jsonwebtoken in return 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2 : Authenticate login credential No login required 
authRouter.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false

    // Validating the validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }


    // 
    const { email, password } = req.body;

    try {
        // Searching user in database
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        // Comparing password with real password
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        // Returning jsonwebtoken in return 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }

})


// ROUTE 3 Get user detail "api/auth/getuser". Login Required
authRouter.post('/getuser', fetchuser, async (req, res) => {


    try {
        let userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})
export default authRouter
