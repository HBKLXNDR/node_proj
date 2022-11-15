const express = require("express");

const userDb = require("./dataBases/users");
const {urlencoded} = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/users",(req, res)=>{
    console.log("users endpoint");

    // res.json({user: "Alex"})
    // res.end("only string can be used in res.end, no objects")
    // res.json(" but in res.json we can use string as well")
    // res.status(402).json("its is OK")
    // res.sendFile("./")
    res.json(userDb)


});

app.get("/users/:userId",(req, res)=>{
    console.log(req.params);
    const {userId} = req.params;

    res.json(userDb[userId])

});

app.post("/users", (req, res)=>{

    const userInfo = req.body
    // console.log(userInfo);
    userDb.push(userInfo)
    res.status(201).json("Created");
})

app.put("/users/:userId", (req, res)=>{
    const newUserInfo = req.body;
    const userId = req.params.userId;

    userDb[userId] = newUserInfo

    res.json("Updated")
})

app.get("/", (req, res)=>{
    console.log("welcome to get response");
})



app.listen(3000, ()=>{
    console.log("server listen 3000");
});


// get all, get one, deleteuserById, creat, updateUserById    +if clauses with user and params are strings!!!  CRUD





