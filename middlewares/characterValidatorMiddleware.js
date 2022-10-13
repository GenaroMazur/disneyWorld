const { body } = require("express-validator")
module.exports = [
    body("name")
        .notEmpty().withMessage("complete the name field").bail(),
    body("image").custom((value, { req }) => {
        let ext = [".jpg", ".jepg", ".png"]
        if (req.body.image && !ext.some(extencion => path.extname(req.body.image) == extencion)) {
            throw new Error("Los formatos permitidos son :" + ext.join(", "))
        }
        return true
    }
    )
]