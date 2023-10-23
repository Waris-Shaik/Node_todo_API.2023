const model = require('../models/user');
const User = model.User;
const bcrypt = require('bcrypt');
const sendCookie = require('../utils/features');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../middlewares/error');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email ID Please Register", 400))
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid Password", 400))
        sendCookie(user, req, res, `WELCOME USER ${user.name.toUpperCase()}`, 200)
    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) return next(new ErrorHandler("User Already Exists Please Login", 400))
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ name, email, password: hashedPassword });
            sendCookie(user, req, res, "User Registered Successfully...", 201)
       
    } catch (error) {
        next(error);
    }

}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, users })
    } catch (error) {
        next(error)
    }

}


exports.logout = (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false : true
    }).json({ success: true, message: "Successfully Logged Out" })
}

exports.getMyProfile = (req, res) => {

    const user = req.user;

    res.status(200).json({
        success: true, user
    })
}