const jwk = require("jsonwebtoken")
const db = require("./../database/models")
const bcript = require("bcrypt")
const sendgrid = require("@sendgrid/mail")

const userController = {
    "loginDefault" : (req, res)=>{
        res.status(200).json({msg:"In post method"})
    },
    
    "registerDefault" : (req, res)=>{
        
        res.status(200).json({msg:"In post method"})
    },
    
    "loginPost" : (req, res)=>{

        let email= req.body.email;
        
        db.User.findOne({where:{email},attributes:["id","status"]})
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
            let msg
                jwk.sign(user,process.env.SECRET,{expiresIn:"1 day"},(err, token)=>{
                    msg = {
                        to: email,
                        from: "disneyWorldApi@hotmail.com",
                        subject: 'verification for disney world api',
                        text: 'pls click in the botton to verify your email direction',
                        html: '<form action="http://localhost:'+process.env.PORT+'/auth/key/'+token+'" method="post"><input type="submit" value="verificar"></form>',
                    }
                    sendgrid.send(msg)
                    .then(response=>{
                        console.log(response[0].statusCode)
                        console.log(response[0].headers)
                    })
                })
                res.status(201).json({msg:"user created correctly, pls verify in your email direction"})
            })
            .catch(err=>{
                console.error(err);
                let msg = err.errors.map(err=>{
                    return err
                })
                res.status(412).json({msg})
            })
    },
    authentication:function(req, res){
        if(req.params.token){
            jwk.verify(req.params.token, process.env.SECRET, (err, token)=>{
                if (err){return res.status(400).json({msg:"invalid token"})}
                db.User.findOne({where:{email:token.email}})
                .then(user=>{
                    if(token.password==user.dataValues.password){
                        return db.User.update({status:"user"},{where:{id:user.dataValues.id}})
                    }else{
                        res.status(400).json({msg:"invalid token"})
                    }
                })
                .then(()=>{
                    res.status(200).json({msg:"user Verified"})
                })

            })
        } else {
            res.status(400).json({msg:"token not found"})
        }
    }
}

module.exports = userController