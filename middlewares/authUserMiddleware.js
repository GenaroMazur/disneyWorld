const bcript = require("bcrypt")
const db = require("../database/models")

module.exports= function(req, res, next){
    
    let email = req.body.email
    let password = req.body.password

    if (!(email && password)){
        return res.status(412).json({msg:"Please, complete the email and password fields"})
    }
    
    db.User.findOne({where:{email}})
    .then(user=> user? user.dataValues : {password:""})
    .then(user=>{
        if (bcript.compareSync(password, user.password)){
            next()
        } else {
            res.status(402).json({msg:"Invalid email or password"})
        }
    })

}
    
