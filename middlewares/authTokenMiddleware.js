const User = require("./../database/models").User
const jwk = require("jsonwebtoken")
module.exports= function(req, res, next){
    let authorization = req.header("authorization")
    let token;
    if (authorization && authorization.toLowerCase().startsWith("bearer")){
        token = authorization.split(" ")[1]
        token = jwk.verify(token,process.env.SECRET)
    }else {
        res.status(400).json({msg:"invalid token"})
    }

    User.findOne({where:{id:token.id},attributes:["id"]})
    .then(user=>res.send(user))
}