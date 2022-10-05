const Character = require("./../database/models").Character
const sequelize = require("sequelize")
const characttersController={

allCharacters:(req,res)=>{

Character.findAll({

    attributes:["name","image",[sequelize.fn("concat","http://localhost:",process.env.PORT,"/characters/",
    sequelize.col("Character.id")),"detail"]]

})
.then(characters=>{
    res.status(200).json({characters})
})
.catch(err=>{
    res.status(500).json({msg:"some error"})
})
},

characterDetail:(req,res)=>{

Character.findOne({
    where:{id:req.params.id},
    include:{
        association:"MovieCharacter",
        attributes:["tittle","dateCreation","calification","image",
        [sequelize.fn('concat',"http://localhost:",process.env.PORT,"/movies/", sequelize.col("movieid")),"detail"]]
    }
})
.then(character=>{
    res.status(200).json(character)
})
.catch(err=>{
    res.status(500).json({msg:"some error"})
})
},

addCharacter:(req,res)=>{


},

updateCharacter:(req,res)=>{


},

deleteCharacter:(req,res)=>{


}
}

module.exports = characttersController