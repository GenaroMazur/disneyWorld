const { validationResult } = require("express-validator");
module.exports=function(req, res, next){
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        errors=errors.mapped()
        let errorMsg ={
            email:errors.email?.msg,
            password:errors.password?.msg
        }
        res.status(401).json({msg: errorMsg})
    }else{
        next()
    };
}