const div = dom.create("<div>newDiv</div>")
dom.after(window.test, div)

const div3 = dom.create("<div id='parent'></div>")
dom.wrap(window.test, div3)
console.log(div);

const nodes = dom.empty(window.empty)
console.log(nodes);
dom.attr(test,"title","hi I'frank")
const attr=dom.attr(test,"title")
console.log(attr);

dom.text(test,"你好，这是新的内容")
dom.text(test)

dom.style(test,{border:"1px solid red",color:"blue"})
dom.style(test,"border")
dom.style(test,"border","1px solid red")

dom.class.add(test,"red")
dom.class.add(test,"blue")
dom.class.remove(test,"blue")
console.log(dom.class.has(test,"blue"));

dom.on(test,"click",()=>{
  console.log("click");
})
// console.log(dom.find(test));
const each=dom.find("#each")
dom.each(dom.children(each),(node)=>console.log(node))