class Context {
    constructor() {
        this.pre = 0;
        this.next = 0
        this.status = false
    }
}

function gen(context) {
    switch ((context.pre = context.next)) {
        case 0:
            context.next = 1
            return 'result0';
        case 1:
            context.next = 2
            return 'result1';
        case 2:
            context.next = 3
            context.status  = true 
            return 'result2';
    }
}

function myGenerator() {
    const context = new Context()
    return {
        next: function () {
            const value = gen(context)
            return {
                value,
                status: context.status
            }
        }
    }
}

const ge = myGenerator()

console.log('ge1', ge.next())
console.log('ge2', ge.next())
console.log('ge3', ge.next())