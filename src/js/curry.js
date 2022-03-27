function curry(fn, args) {
    const length = fn.length;
    args = args || [];
    return function() {
        const _args = args.slice(0)
        console.log('_args',_args)
        const newArgss = [].slice.call(arguments)
        _args.push(...newArgss)
        console.log('_args',_args)
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}


// var fn = curry(function(a, b, c) {
//     console.log([a, b, c]);
// });
//
// fn("a")("b")("c") // ["a", "b", "c"]

function add(a, b){
    return a + b
}
const c = curry(add)

console.log('cc',c(1)(2))