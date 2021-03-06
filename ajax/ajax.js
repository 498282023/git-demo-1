// var ajax = function (method, url, option) {
//   const { success, fail } = option
//   const request = new XMLHttpRequest()
//   request.open(method, url)
//   request.onreadystatechange = () => {
//     if (request.readyState === 4) {
//       if (request.status < 400) {
//         success.call(null, request.response)
//       } else {
//         fail.call(null, request, request.status)
//       }
//     }
//   }
//   request.send()
// }

// ajax("get",'/xxx',{
//   success(res){},
//   fail(req,stutas){}
// })

var ajax = function (method, url,data) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status < 400) {
          resolve.call(null, request.response)
        } else {
          reject.call(null, request)
        }
      }
    }
    request.send(data)
  })
}

ajax("get", '/xxx')
  .then((res) => { }, (req) => { })

