const path = require("path")
const fs = require("fs")
module.exports = {
    movies:(req, res)=>{
        if(!req.params.img){
            return res.status(400).json({msg:"invalid image"})
        }
        let direction = path.join(__dirname,"./../img/movies",req.params.img)
        if (fs.existsSync(direction)){
            res.status(200).sendFile(direction)
        } else {
            res.status(400).json({msg:"image not found"})
        }
    },
    characters:(req, res)=>{
        if(!req.params.img){
            return res.status(400).json({msg:"invalid image"})
        }
        let direction = path.join(__dirname,"./../img/characters",req.params.img)
        if (fs.existsSync(direction)){
            res.status(200).sendFile(direction)
        } else {
            res.status(400).json({msg:"image not found"})
        }
    }
}