const fs = require("fs/promises");
const express = require("express")
const path = require("path")

const app = express()



//all functions in file will be run by require(), log as well
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






