console.log('1');

setTimeout(function() {
  console.log('2');
}, 0);

Promise.resolve().then(function() {
  console.log('3');
}).then(function() {
  console.log('4');
});
console.log('5')


//1, 5, 3, 4, 2