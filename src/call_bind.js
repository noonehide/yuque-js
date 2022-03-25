function myCall (context, ...args) {
    if(context === undefined || context === null) {
        context = window
    }else {
        context = Object(context)
    }
    const key = Symbol('key')
    context[key] = this
    const res = context['key'](...args)
    delete context[key]
    return res
}

function myBind(context) {
    const _this = this
    const preArgs = Array.prototype.slice.call(arguments, 1)
    return function () {
        const args = Array.prototype.slice.call(arguments)
        const all = preArgs.concat(args)
        return _this.apply(context, all)
    }
}

const data = []
for(var i = 0; i<9;i++) {
    data[i] = (function (key) {
        return function (){
            console.log(key)
        }
    })(i)
}