import $ from "jquery"
import "./app1.css"
import Model from "./base/Model.js";
import View from "./base/View";
import Vue from "vue"

const init = (el) => {
  const eventBus=new Vue()
  console.dir(eventBus.$on)
  console.dir(eventBus.$off)
  console.dir(eventBus.$emit)
  const m ={
    get() {
      return parseFloat(localStorage.getItem("n"))||100
    },
    set(n) {
      return  parseFloat(localStorage.setItem("n", n))
    }
  }
  new Vue({
    el: el,
    data: {n: m.get()},
    template: `
      <section id="app1">
      <div class="output">
        <span id=number>{{ n }}</span>
      </div>
      <div class="actions">
        <button @click='add'>+1</button>
        <button @click='minus'>-1</button>
        <button @click='mul'>*2</button>
        <button @click='div'>➗2</button>
      </div>
      </section>
    `,
    methods: {
      add() {
        this.n += 1
      },
      minus() {
        this.n -= 1
      },
      mul() {
        this.n *= 2
      },
      div() {
        this.n /= 2
      },
    },
    watch: {
      n() {
        localStorage.setItem("n", this.n)
      }
    }
  })
  return
  new View({
    el: el,
    data: m.data,
    html: `
   
  `,
    render(data) {
      const n = data.n
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

  })
}

export default init

