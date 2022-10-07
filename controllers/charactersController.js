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
    let character = {
        name : req.body.name,
        age: req.body.age,
        weigth: req.body.weigt,
        history: req.body.history,
        image: req.body.image
    }
    Character.create(character)
    .then(()=>{
        res.status(201).json({msg:"character created !"})
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({msg:"some error"})
    })
},

updateCharacter:(req,res)=>{
    let character = {
        name : req.body.name,
        age: req.body.age,
        weigth: req.body.weigt,
        history: req.body.history,
        image: req.body.image
    }
    Character.update(character,{where:{id:req.params.id}})
    .then(()=>{
        res.status(200).json({msg:"character edited !"})
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({msg:"some error"})
    })

},

deleteCharacter:(req,res)=>{
    Character.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.status(200).json({msg:"character deleted !"})
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({msg:"some error"})
    })

}
}

module.exports = characttersController