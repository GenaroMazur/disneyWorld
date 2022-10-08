const {body} = require("express-validator")
const User = require("./../database/models").User
module.exports = [
    body("email")
        .notEmpty().withMessage("Complete the email field").bail()
        .isEmail().withMessage("is not a valid email").bail()
        .custom(async(value,{req})=>{
            await User.findOne({where:{email:value}})
            .then(email=>{
                if (email!=null){
                    throw new Error("email already in use");
                }
                return true
            })
        }),
    body("password")
        .notEmpty().withMessage("Complete the password field").bail()
        .isLength({min:8}).withMessage("8 characters min")
        .custom((value,{req})=>{
            const letters = "abcdefghijklmnñopqrstuvwxyz"
            const numbers = "1234567890"
            valid = {
                validLetters : false,
                validNumbers : false
            }
            valid.validLetters = letters.split("").some(letter=>value.includes(letter))
            valid.validNumbers = numbers.split("").some(num=>value.includes(num))
            if(valid.validLetters && valid.validNumbers){
                return true
            }
            else{
                throw new Error("require an upper case letter, an lower case letter and a number")
            }
        })
]