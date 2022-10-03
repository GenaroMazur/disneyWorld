const jwk = require("jsonwebtoken")
const db = require("./../database/models")
const session = require ("express-session")
const userController = {
    "loginDefault" : (req, res)=>{
        
    },
    
    "registerDefault" : (req, res)=>{
        
        jwk.sign(mensaje,"disneyWorld",(err,token)=>{
            res.status(200).json(token)
        })
    },
    
    "loginPost" : (req, res)=>{
        if (req.body && req.body.token) {
            jwk.verify(req.body.token, "disneyWorld", (err, key)=>{

                if ( key && key.email && key.password ){

                    db.User.findOne({
                        where:{email:key.email, password:key.password},
                        attributes:["id","email"]
                    })
                    .then(user=>{
                        
                        res.status(200).json(user)
                    })
                    .catch(err=>{
                        res.status(500).json({msg:"server error"})
                        console.error(err);
                    })

                } else {
                    res.status(412).json({"msg":"invalid token"})
                }

            })
            
        } else {

            res.status(412).json({msg:"invalid token"})
        }

    },
    
    "registerPost" : (req, res)=>{
        let email = req.body.email
        let password = req.body.password

        if (email && password){
            
            let user = {email, password}

            db.User.create(user)
            .then(()=>{
                jwk.sign(user,"disneyWorld",(err,token)=>{
                    res.status(200).json({token})
                })
            })
            .catch(err=>{
                console.error(err);
                let msg = err.errors.map(err=>{
                    return err
                })
                res.status(412).json({msg})
            })

        } else {
            res.status(412).json({msg:"Please, complete the email and password inputs"})
        }
    }
}

module.exports = userController