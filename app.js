const express = require("express");
const app = express();
const cors = require("cors");

if (!process.env.PORT){
    require("dotenv").config()
}

app.use(cors())

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const session = require("express-session");
app.use(session({
    secret:"ariel",
    resave: false,
    saveUninitialized: false
}));

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