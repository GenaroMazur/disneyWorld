module.exports = (req, res)=>{
    let welcome = {
        "login":"http://localhost:"+process.env.PORT+"/auth/login",
        "register":"http://localhost:"+process.env.PORT+"/auth/register"
    }
    res.status(200).json(welcome);
};