const express = require("express");
const fs = require("fs/promises");
const path = require("path");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/users", async (req, res) => {

    const users = await reader();

    res.json(users);
})

app.post("/users", async (req, res) => {
    const userInfo = req.body
    if (userInfo.name.length < 3 || typeof userInfo.name !== "string") {
        return res.status(400).json("name is incorrect")
    }
    if (userInfo.age <= 0 || Number.isNaN(+userInfo.age)) {
        return res.status(400).json("wrong age")
    }

    const users = await reader();

    const newUser = {
        name: userInfo.name,
        age: userInfo.age,
        id: users[users.length - 1].id + 1
    }

    users.push(newUser)

    await writer(users)

    res.status(201).json(newUser)
})

app.get("/users/:userId", async (req, res) => {
    // console.log(req.params);
    const {userId} = req.params;

    const users = await reader();

    const user = users.find((el) => el.id === +userId)
    if (!user) {
        return res.status(404).json(`user with id ${userId} is not found`)
    } else {
        res.json(user)
    }
})

app.put("/users/:userId", async (req, res) => {
    const newUserInfo = req.body;
    const {userId} = req.params;

    const users = await reader();
    const index = users.findIndex((el) => el.id === +userId);

    if (index === -1) {
        return res.status(404).json(`user with id ${userId} is not found`);
    }

    users[index] = {...users[index], ...newUserInfo};

    await writer(users)

    res.status(201).json(users[index]);
})
app.delete("/users/:userId", async (req, res) => {
    const {userId} = req.params;

    const users = await reader();
    const index = users.findIndex((el) => el.id === +userId);

    if (index === -1) {
        return res.status(404).json(`user with id ${userId} is not found`);
    }

    users.splice(index, 1);

    await writer(users)

    res.status(204).json("deleted, sendStatus is not available");
})


app.listen(3000, () => {
    console.log('Server listen 3000');
});

const reader = async () => {
    const buffer = await fs.readFile(path.join(__dirname, "dataBase", "users.json"));
    return JSON.parse(buffer.toString())
}
const writer = async (users) => {
    await fs.writeFile(path.join(__dirname, "dataBase", "users.json"), JSON.stringify(users));
}

//all functions in file will be run by require("name of the file"), log as well
// const builder = require("./someD/someF")

// const student1 = builder.studentBuilder("max", 23);


// fs.readFile("./text.txt",(err, data)=>{
//     console.log(err, "ERR");
//
//     console.log(data.toString());
// })

// fs.appendFile('./text.txt', 'hello there \n',(err)=>{
//     console.log(err, "ERR");
// })
//
// fs.writeFile('./text.txt', 'Write File',(err)=>{
//     console.log(err, "err");
// })

// copying data to another file
// fs.readFile("./text.txt",(err, data)=>{
//     fs.appendFile('./copy.txt',data,(err)=>{
//         console.log(err);
//     })
// })


// cleaning file
// fs.truncate("./copy.txt",(err)=>{
//     console.log(err);
// })
//

// deletes file
// fs.unlink("./copy.txt", (err)=>{
//     console.log(err);
// })
// Use fs.rm(path, { recursive: true }) instead
// fs.rmdir("./folder",{recursive: true}, err => {
//     console.log(err);
// })

// do not change files by name like below!
// fs.rename('./text.txt', './users.js', err => {
//     console.log(err);
// })

// fs.rename('./users.js',"./someD/users.json", err => {
//     console.log(err);
// })

// fs.copyFile("./someD/users.json","./copy.json", err => {
//     console.log(err);
// })






