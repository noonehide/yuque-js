
function throttle(fn, delay) {
    let time = Date.now()
    let isFirst = true
    return function () {
        if(Date.now() - time >= delay || isFirst) {
            fn.apply(this)
            time = Date.now()
            isFirst = false
        }
    }
}

function add (a, b ){
    console.log('add')
    return a + b
}
const throttleAdd  = throttle(add, 3000)
throttleAdd(1,2)
setTimeout(()=>{
    throttleAdd(1,2)
}, 3400)


function debounce(fn, delay) {
    let timer
    return function () {
        clearTimeout(timer)
        setTimeout(function () {
            fn.apply(this)
        }, delay)
    }
}

const debounceAdd  = debounce(add, 3000)
debounceAdd(1,2)
setTimeout(()=>{
    debounceAdd(1,2)
}, 3400)
