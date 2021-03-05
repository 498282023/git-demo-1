const http = require("http")
const fs = require("fs")
const url = require("url")
const port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer((req, res) => {
  var parseURL = url.parse(req.url, true)
  var pathWithQuery = req.url
  var queryString = ""
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"))
  }
  var path = parseURL.pathname
  var query = parseURL.query
  var method = req.method
  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  if(path==="/home.html"){
    const cookie=req.headers["cookie"]
    let sessionId
    try {
      sessionId=cookie.split(";").find(s=>s.indexOf("session_id")>=0).split("=")[1]
    } catch (error) {}
    if(sessionId){
      const userId=JSON.parse(fs.readFileSync(`./session.json`).toString())[sessionId].user_id
      console.log(userId);
      const userArray=JSON.parse(fs.readFileSync("./db/users.json").toString())
      const user=userArray.find(user=>user.id===userId)
      const homeHtml=fs.readFileSync(`./public/home.html`).toString()
      if(user){
        const string=homeHtml.replace(`{{loginStatus}}`,"已登录").replace(`{{user.username}}`,user.username)
        res.end(string)
      }else{
        res.end("未登录")
      }
    }else{
      res.end("未登录")
    }
  }
  else if (path === '/sign_in' && method === "POST") {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    const array = []
    req.on("data", (chunk) => {
      array.push(chunk)
    })
    req.on("end", () => {
      const string = Buffer.concat(array).toString()
      const obj=JSON.parse(string)
      const userArray=JSON.parse(fs.readFileSync("./db/users.json").toString())
      const user=userArray.find(user=>user.username===obj.username&&user.password===obj.password)
      if(user===undefined){
        res.statusCode=400
        res.end("username password不匹配")
      }else{
        res.statusCode=200
        const random=Math.random()
        const session=JSON.parse(fs.readFileSync(`./session.json`).toString())
        session[random]={user_id:user.id}
        fs.writeFileSync(`./session.json`,JSON.stringify(session))
        res.setHeader("Set-Cookie",`session_id=${random};httpOnly`)
        res.end()
      }
    })
  }else if (path === '/register' && method === "POST") {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    const array = []
    
    req.on("data", (chunk) => {
      array.push(chunk)
    })
    req.on("end", () => {
      const string = Buffer.concat(array).toString()
      const obj=JSON.parse(string)
      const userString=fs.readFileSync("./db/users.json").toString()||`[]`
      console.log("userString",userString);
      const user=JSON.parse(userString)||[]
      const newUser={
        id:user[user.length-1]?user[user.length-1].id+1||1:1,
        username:obj.username,
        password:obj.password,
      }
      user.push(newUser)
      fs.writeFileSync(`./db/users.json`,JSON.stringify(user))
      res.end("很好")
    })
  }else{
    const x=path==="/"?"/index.html":path
    const suffix=x.substring(x.lastIndexOf("."))
    console.log(suffix);
    const fileType={
      ".html":"text/html",
      ".css":"text/css",
      ".js":"text/js",
      ".png":"image/png",
      ".jpg":"image/jpeg",
      ".jpeg":"image/jpeg",
    }
    let content=""
    try {
      const file=fs.readFileSync(`./public${x}`)
      content=file.toString()
    } catch (error) {
      content=`你输入的路径不存在对应的内容`
    }
    res.setHeader('Content-Type', `${fileType[suffix]||"text/html"};charset=utf-8`)
    res.statusCode = 200
    res.write(content)
    res.end()
  }

  /******** 代码结束，下面不要看 ************/
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)