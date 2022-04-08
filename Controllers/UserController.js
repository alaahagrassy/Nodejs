const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')
const _ = require('lodash');
const { body, validationResult } = require('express-validator');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

module.exports.register = async (req, res, next) => {
    const { email, firstName, lastName, password, city, street, zipcode, admin } = req.body;
    const errors = validationResult(req);
    const user = await UserModel.findOne({ email });
    if (errors.errors.length) {
        res.status(404).json(!errors.errors.length)
        return;
    }
    if (user) {
        return res.status(409).json({
            message: "E-mail exists"
        })
    }
    const newUser = new UserModel({
        email, firstName, lastName, hashedPassword: password, city, street, zipcode, admin
    }).save()
        .then((data, error) => {
            if (error) {
                res.status(404).json(error);
                return;
            }
            res.status(200).json({ status: "success", data: "user added succsufully" })
        })
}
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    user.comparePassword(password, (err, isMatch) => {
        if (err) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        if (isMatch) {
            const userId = user._id;

            const token = jwt.sign({ userId }, jwtSecret);
            res.status(200).json({ status: "success", token })
            return;
        }

        //handle error email or passowrd not correct
    })

}
