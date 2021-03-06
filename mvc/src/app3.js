import $ from "jquery"
import "./app3.css"
const html=`
<section id="app3">
      <div class="square"></div>
    </section>
`
const $element=$(html).appendTo($("body>.page"))

const localkey = "app3.active"
const $square = $("#app3 .square")
const active = localStorage.getItem(localkey) === "yes"

$square.toggleClass("active",active)

$square.on("click", () => {
  if ($square.hasClass("active")) {
    localStorage.setItem(localkey, "no")
    $square.removeClass("active")
  } else {
    localStorage.setItem(localkey, "yes")
    $square.addClass("active")
  }
})

