const jwk = require("jsonwebtoken")

const userController = {
    "loginDefault" : (req, res)=>{

        res.status(200).json("")
    },
    
    "registerDefault" : (req, res)=>{

        res.status(200).json("")
    },
    
    "loginPost" : (req, res)=>{
        
        res.status(200).json("")
    },
    
    "registerPost" : (req, res)=>{
        let user;
        if (req.body && req.body.name && req.body.password) {
            let username = req.body.name;
            let password = req.body.password;
            user = {
                username,
                password,
            }
        }
        jwk.sign({user}, "disneyWorld", (err, token)=>{
            user.key = token;
            res.status(200).json({token})
        })
    }
}

module.exports = userController