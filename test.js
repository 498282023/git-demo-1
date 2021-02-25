let i
for (i = 0; i < 6; i++) {
  setTimeout(function(i){
    console.log(i)
  }.bind(null,i), 0)
}