const express = require("express");
const app = express();

if (!process.env.PORT){
    require("dotenv").config()
}

const cors = require("cors");
app.use(cors())

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("The Disney World runing in the port :" + PORT);
});

const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes);

app.use((req, res, next)=>{
    res.status(404).json("URL not found ( 404 )");
});