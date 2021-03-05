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

  if (path === '/index.html') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(fs.readFileSync(`public/index.html`))
    res.end()
  } else if (path === '/qq.js') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    res.write(fs.readFileSync(`public/qq.js`))
    res.end()
  } else if (path === `/friends.json`) {
    res.statusCode = 200
    res.setHeader(`Access-Control-Allow-Origin`, "http://localhost:9999")
    res.write(fs.readFileSync(`public/friends.json`))
    res.end()
  } else if (path === `/friends.js` && req.headers['referer'].indexOf(`http://localhost:9999`) === 0) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/javascript;charset=utf-8")
    const data=fs.readFileSync(`public/friends.json`).toString()
    const jsStr=`window['${query.callback}'](${data})`
    res.write(jsStr)
    res.end()
  } else if (path === `/3.html`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    res.write(fs.readFileSync(`public/3.html`))
    res.end()
  } else if (path === `/4.xml`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml;charset=utf-8')
    res.write(fs.readFileSync(`public/4.xml`))
    res.end()
  } else if (path === `/5.json`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/json;charset=utf-8')
    res.write(fs.readFileSync(`public/5.json`))
    res.end()
  } else if (path === `/page2.json`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/json;charset=utf-8')
    res.write(fs.readFileSync(`db/page2.json`))
    res.end()
  } else if (path === `/page3.json`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/json;charset=utf-8')
    res.write(fs.readFileSync(`db/page3.json`))
    res.end()
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(`你输入的路径不存在对应的内容`)
    res.end()
  }
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)