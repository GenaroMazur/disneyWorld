const multer = require("multer")
const path = require("path")

module.exports = {
    movies:function(){
        const config = multer.diskStorage({
            destination:(req,file,cb)=>{
                let destino = path.join(__dirname,"./../img/movies")
                cb(null,destino)
            },
            filename:(req,file,cb)=>{
                let filename=req.body.tittle+".jpg"
                cb(null,filename)
            }
        })
        const upload = multer({
            storage:config,
            fileFilter:(req, file, cb)=>{
                req.body.image=file.originalname
                let ext = [".jpg", ".jepg", ".png"]
                if (ext.some(extencion => path.extname(file.originalname)==extencion)) {
                    cb(null,true)
                } else {
                    cb(null,false)
                }
            }
        })
        return upload
    },
    characters:function(){
        const config = multer.diskStorage({
            destination:(req,file,cb)=>{
                let destino = path.join(__dirname,"./../img/characters")
                cb(null,destino)
            },
            filename:(req,file,cb)=>{
                let filename=req.body.name+".jpg"
                cb(null,filename)
            }
        })
        const upload = multer({
            storage:config,
            fileFilter:(req, file, cb)=>{
                req.body.image=file.originalname
                let ext = [".jpg", ".jepg", ".png"]
                if (ext.some(extencion => path.extname(file.originalname)==extencion)) {
                    cb(null,true)
                } else {
                    cb(null,false)
                }
            }
        })
        return upload
    }
}
