const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({

            email: email

        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });

        res.status(201).json({

            message: "User Registered Successfully",

            user

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                message: "Email and Password required"

            });

        }

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(404).json({

                message: "User Not Found"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                userId: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.status(200).json({

            message: "Login Successful",

            token

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

module.exports = {

    signup,
    login

};