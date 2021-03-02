const http=require("http")
const fs=require("fs")
const url=require("url")
const port =process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server=http.createServer((req,res)=>{
  var parseURL=url.parse(req.url,true)
  var pathWithQuery=req.url
  var queryString=""
  if(pathWithQuery.indexOf("?")>=0){
    queryString=pathWithQuery.substring(pathWithQuery.indexOf("?"))
  }
  var path=parseURL.pathname
  var query=parseURL.query
  var method=req.method
  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    res.statusCode = 200
 
    let content 
    const filePath=path===`/`?`/index.html`:path
    const suffix=filePath.substring(filePath.lastIndexOf("."))
    const fileTypes={
      '.html':'text/html',
      '.css':'text/css',
      '.js':'text/javascript',
      '.png':'image/png',
      '.jpg':'image/jpeg',
    }
    res.setHeader('Content-Type', `${fileTypes[suffix]||'text/html'};charset=utf-8`)
    try {
      content=fs.readFileSync(`./public${filePath}`)
    } catch (error) {
      content=`文件不存在`
      res.statusCode=404 
    }
    res.write(content)
    res.end()

  /******** 代码结束，下面不要看 ************/
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)