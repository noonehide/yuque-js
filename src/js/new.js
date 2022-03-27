function myNew(func) {
    const obj = Object.create(func.prototype)
    const args  = [].slice.call(arguments, 1)
    // 生成的新对象会绑定到函数调用的`this`。
    console.log('111', obj)
    const res = func.apply(obj,args)
    if(typeof  res === 'object' || typeof res === 'function') {
        return res
    }
    console.log('222', obj)
    return obj
}

function f() {
    this.name = '11'
}

const a = myNew(f)

console.log('a', a.name)