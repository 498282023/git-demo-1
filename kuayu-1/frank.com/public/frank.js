// function jsonp(url) {
//   return new Promise((resolve, reject) => {
//     const random = Math.random()
//     window[random] = (data) => {
//       resolve(data)
//     }
//     const script = document.createElement("script")
//     script.src = `${url}?callback=${random}`
//     script.onload = () => {
//       script.remove()
//     }
//     script.onerror = () => {
//       reject();
//     }
//     document.body.appendChild(script)
//   })
// }

// jsonp("http://localhost:8888/friends.js")
//   .then((data)=>{
//     console.log(data);
//   })
window.getFriends=(data)=>{
  document.body.innerHTML=JSON.stringify(data)
}

const script=document.createElement("script")
script.src=`http://localhost:8888/friends.js?callback=${Math.random()}`
document.body.appendChild(script)

