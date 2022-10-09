const jwk = require("jsonwebtoken")
module.exports= (req, res, next)=>{
    let authorization = req.header("authorization")
    let token = authorization.split(" ")[1]
    jwk.verify(process.env.SECRET, token, (err,auth)=>{
        if(auth.status=="guest"){
            res.status(400).json({msg:"user not verified"})
        } else if(auth.status=="user"){
            next()
        }
    })
}