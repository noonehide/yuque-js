console.log('1')
setTimeout(() => {
  console.log('2')
  Promise.resolve().then(function() {
    console.log('3')
  })
}, 0)


setTimeout(() => {
  console.log('4')
  Promise.resolve().then(function() {
    console.log('5')
  })
}, 0)

Promise.resolve().then(function() {
  console.log('6')
})
console.log('7')


//1, 7, 6, 2, 3, 4, 5