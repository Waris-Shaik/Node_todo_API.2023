const jwt = require('jsonwebtoken');
const model = require('../models/user');
const User = model.User;

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(400).json({ success: false, message: "Please Login First!" });

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decode._id)

    next();

}


exports.isAuthenticated = isAuthenticated;