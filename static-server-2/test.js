const fs = require("fs")

// 读
const userString = fs.readFileSync("./db/users.json").toString()
const userArray = JSON.parse(userString)
// 写
const user3 = { "id": 3, "name": "tom", "password": "zzz" }
userArray.push(user3)
const string=JSON.stringify(userArray)
fs.writeFileSync('./db/users.json',string)