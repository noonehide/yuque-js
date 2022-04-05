// Array.a = 1
// Array.prototype.a = 2

// const arr = []
// console.log('1...', arr.a)
// console.log('2...', arr.length.a)


// var num = 1
// const a = {
//     num: 2,
//     say: function(){
//         console.log('this', this.num)
//     }
// }
// const b = {
//     num: 3,
//     say: function(func){
//         func()
//     }
// }
// b.say(a.say)


// new Promise((resolve)=>{
//     console.log(1)
//     resolve()
//     setTimeout(() => {
//         console.log(2)
//     }, 1000);
// }).then(res=>{
//     console.log(3)
// }).then(res=>{
//     return new Promise((resolve)=>{
//         console.log(4)
//         resolve()
//     }).then(res=>{
//         console.log(5)
//     })
// }).then(res=>{
//     console.log(6)
// })


// function add(x) {
//     // 存储和
//     let sum = x;

//     // 函数调用会相加，然后每次都会返回这个函数本身
//     let tmp = function (y) {
//       sum = sum + y;
//       return tmp;
//     };

//     // 对象的toString必须是一个方法 在方法中返回了这个和
//     tmp.toString = () => sum
//     return tmp;
//  }

//  console.log('ff', add(1)(2)(3))

function add(...args) {
    let sum = args.reduce((target, v) => target + v, 0);
    function s(...sArgs) {
        sum = sArgs.reduce((target, v) => target + v, sum);
        return s;
    }
    s.toString = function () {
        return sum;
    };
    return s;
}
const a = add(1, 2)(2)(3)
console.log('a', a)
add(1, 2)(2)(3)(4)
add(1, 2)(2)(3)(4)(12)