const jwk = require("jsonwebtoken")
const db = require("./../database/models")
const bcript = require("bcrypt")

const userController = {
    "loginDefault" : (req, res)=>{
        res.status(200).json({msg:"please, complete the fildes : email, password"})
    },
    
    "registerDefault" : (req, res)=>{
        
        res.status(200).json({msg:"please, complete the fildes : email, password"})
    },
    
    "loginPost" : (req, res)=>{

        let email= req.body.email;
        
        db.User.findOne({where:{email},attributes:["id"]})
        .then(user=> user.dataValues)
        .then(user=>{
            //token expira en un dia
            jwk.sign( user,process.env.SECRET,{expiresIn:"1 day"},(err, token)=>{
                res.status(200).json({token})
            } )
        })

    },
    
    "registerPost" : (req, res)=>{
        let email = req.body.email
        let password = req.body.password


            let user = {email, password}
            user.password = bcript.hashSync(user.password, 10)

            db.User.create(user)
            .then(()=>{
                res.status(201).json({msg:"user created usefull"})
            })
            .catch(err=>{
                console.error(err);
                let msg = err.errors.map(err=>{
                    return err
                })
                res.status(412).json({msg})
            })

        
    }
}

module.exports = userController