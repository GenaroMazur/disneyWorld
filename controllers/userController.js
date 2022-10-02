const jwk = require("jsonwebtoken")
const db = require("./../database/models")
const userController = {
    "loginDefault" : (req, res)=>{
        db.User.findAll()
        .then(user=>{
            res.status(200).json({user})
        })
        .catch(err=>{
            res.status(500).json({msg:"error"})
            console.error(err);
        })
    },
    
    "registerDefault" : (req, res)=>{

        res.status(200).json("")
    },
    
    "loginPost" : (req, res)=>{

        let email = req.body.email
        let password = req.body.password

        if (email && password){
            db.User.findOne({where:{
                "email":email
            }})
            .then(user=>{
                res.status(200).json({msg: user})
            })
            .catch(err=>{
                console.error(err);
                
                let msg = err.errors.map((err, i)=>{
                    return {i : err.message}
                })

                res.status(500).json({msg})
            })
        } else {
            res.status(412).json({msg:"complete the login form"})
        }

    },
    
    "registerPost" : (req, res)=>{
        let email = req.body.email
        let password = req.body.password

        if (email && password){
            
            let user = {email, password}

            db.User.create(user)
            .then(()=>{
                res.status(200).json({msg:"User Created"})
            })
            .catch(err=>{
                console.error(err);
                let msg = err.errors.map(err=>{
                    return err.message
                })
                res.status(412).json({msg})
            })

        } else {
            res.status(412).json({msg:"Please, complete the email and password inputs"})
        }
    }
}

module.exports = userController