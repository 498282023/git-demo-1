const sound = document.querySelector("#sound")
const mouth = document.querySelector(".mouth")
mouth.onmouseover = () => {
  sound.play()
}

const string = `
body{
  background-color: rgb(255,229,0);
}
.skin{
  position: relative;
}
.nose{
  position: absolute;
  left: 50%;
  top: 145px;
  margin-left: -10px;
  border: 10px solid red;
  border-color: black transparent;
  border-top-width: 8px;
  border-bottom: none;
  width: 20px;
  height: 2px;
  z-index: 20;
  transform-origin: center bottom;
  animation: wave 1s infinite linear alternate;
}

.yuan{
  position: absolute;
  width: 20px;
  height: 9px;
  top: -17px;
  transform: translateX(-50%);
  border-radius: 10px 10px 0 0;
  background-color: black;
}
.eye{
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  top: 100px;
  left: 50%;
  margin-left: -25px;
  background-color: rgb(46,45,46);
  border: 2px solid #000;
  border-radius: 50%;
}
.eye::before{
  content: "";
  display: block;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #000;
  position: relative;
  left: 2px;
  top: 2px;
  animation:moveEyes 1s infinite alternate;
}

.eye.left{
  transform: translateX(-100px);
}
.eye.right{
  transform: translateX(100px);
}


.mouth{
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  margin-left: -100px;
  top: 150px;
}
.mouth .up {
}
.mouth .up .lip{
  top: 0;
  position: absolute;
  display: inline-block;
  width: 80px;
  border: 2px solid #000;
  height: 40px;
  border-top:none;
  background-color: #FFE500;
}
.mouth .up .lip.left{
  left: 17px;
  border-radius:0  0 0 50px;
  border-right:none;
  transform: rotate(-20deg);
}
.mouth .up .lip.right{
  right: 17px;
  border-radius:0 0 50px 0 ;
  border-left:none;
  transform: rotate(20deg);
}
.mouth .down{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  width: 100px;
  height: 125px;
  overflow: hidden;
  z-index: -1;
}
.mouth .down .yuan1{
    position: absolute;
    left: 50%;
    top: -180px;
    width: 100px;
    transform: translateX(-50%);
    border: 2px solid #000;
    height: 280px;
    border-radius: 100px/280px;
    background-color: #990513;
    overflow: hidden;
  }
.mouth:hover .down .yuan1{
  animation: close 1s infinite alternate;
}
.mouth .down .yuan1 .tough{
  position: absolute;
  top: 210px;
  width: 100px;
  height: 150px;
  background-color: #FC4A62;
  border-radius: 100px/150px;
}

.face{
  top: 180px;
  content: "";
  position: absolute;
  display: block;
  border: 2px solid #000;
  background-color: rgb(252,13,28);
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
.face.left{
  left: 50%;
  margin-left: 100px;
}
.face.right{
  right: 50%;
  margin-right: 100px;
}
`
const demo = document.querySelector("#demo")
const demo2 = document.querySelector("#demo2")
let n = 1
let time = 100
let id

const player = {
  init:()=>{
    document.querySelector("#playBtn").onclick = player.play
    document.querySelector("#pauseBtn").onclick = player.pause
    document.querySelector("#slowBtn").onclick = player.slow
    document.querySelector("#normalBtn").onclick = player.normal
    document.querySelector("#fastBtn").onclick = player.fast
    document.querySelector("#resetBtn").onclick = player.reset
  },
  run: () => {
    if (n >= string.length) clearInterval(id)
    demo.innerText = string.slice(0, n)
    demo2.innerHTML = string.slice(0, n)
    demo.scrollTop = demo.scrollHeight
    n++
  },
  play: function () {
    if (id) return
    if (typeof arguments[0] === "number") {
      time = arguments[0]
    }
    id = setInterval(player.run, time)
  },
  pause: () => {
    window.clearInterval(id)
    id = null
  },
  slow: () => {
    player.pause()
    player.play(300)
  },
  normal: () => {
    player.pause()
    player.play(100)
  },
  fast: () => {
    player.pause()
    player.play(10)
  },
  reset: () => {
    player.pause()
    n = 1
    player.play(100)
  }
}
player.play()
