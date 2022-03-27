
function Parent() {
    this.name = '111'
}

Parent.prototype.say = function () {
    console.log('sss')
}

function Son() {
    Parent.call(this)
}

// 组合继承，调用了两次Parent
// Son.prototype = new Parent()
// Son.prototype.constructor = Son


function insert(son, parent) {
    function f() {
    }
    f.prototype = parent.prototype
    son.prototype = new f()
    son.prototype.constructor = son
}

insert(Son, Parent)

const son = new Son()

console.log('sss', son.__proto__)
