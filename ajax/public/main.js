let n=2
getPage.onclick=()=>{
  const request=new XMLHttpRequest()
  request.open("GET",`/page${n}.json`)
  request.onreadystatechange=()=>{
    if(request.readyState===4&&request.status===200){
      const array=JSON.parse(request.response)
      array.forEach(item=>{
        const li=document.createElement("li")
        li.textContent=item.id
        xxx.appendChild(li)
      })
      n++
    }
  }
  request.send()
}
getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "5.json")
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const object=JSON.parse(request.response) 
      console.log(object);
    }
  }
  request.send()
}
getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "4.xml")
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const dom = request.responseXML
      const text = dom.getElementsByTagName("warning")[0]
      document.body.appendChild(text)
    }
  }
  request.send()
}
getHTML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "/3.html")
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        console.log(request.readyState);
        const div = document.createElement("div")
        div.innerHTML = request.response
        console.log(div);
        document.body.appendChild(div)
      } else {

      }
    }
  }
  request.onerror = () => { }
  request.send()

}
getJS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "/2.js")
  request.onload = () => {
    const script = document.createElement("script")
    script.innerHTML = request.response
    document.body.appendChild(script)
  }
  request.onerror = () => { }
  request.send()
}
getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "/style.css")
  request.onload = () => {
    const style = document.createElement("style")
    style.innerHTML = request.response
    document.head.appendChild(style)
  }
  request.onerror = () => {
  }
  request.send()
}
