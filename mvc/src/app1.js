import $ from "jquery"
import "./app1.css"
import Model from "./base/Model.js";
import View from "./base/View";
import EventBus from "./base/EventBus";


const m = new Model({
  data: {
    n: parseFloat(localStorage.getItem("n")) || 100
  },
  update: function (data) {
    Object.assign(m.data, data)
    m.trigger("m:updated")
    localStorage.setItem("n", m.data.n)
  }
})
const init = (el) => {
  new View({
    el: el,
    data:m.data,
    html: `
    <div>
        <div  class="output">
            <span id=number>{{n}}</span>
          </div>
          <div class="actions">
            <button id=add1>+1</button>
            <button id=minus1>-1</button>
            <button id=mul2>*2</button>
            <button id=divide2>➗2</button>
          </div>
    </div>
  `,
    render(data) {
      const n=data.n
      if (this.el.children().length !== 0) this.el.empty()
      this.el = $(this.html.replace("{{n}}", n.toString()))
          .appendTo($(this.el))
    },
    events: {
      'click #add1': 'add',
      'click #minus1': 'minus',
      'click #mul2': 'mul',
      'click #divide2': 'div',
    },
    add() {
      m.update({n: m.data.n + 1})
    },
    minus() {
      m.update({n: m.data.n - 1})
    },
    mul() {
      m.update({n: m.data.n * 2})
    },
    div() {
      m.update({n: m.data.n / 2})
    },
  })
}

export default init

