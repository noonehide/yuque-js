class EventEmit{
    constructor(){
        this.events = new Map()
    }

    emit(key, ...args){
        const cbs = this.events.get(key) || []
        cbs.forEach(cb=>{
            cb(...args)
        })
    }

    on(key, cb) {
        const cbs = this.events.get(key) || []
        this.events.set(key, [...cbs, cb])
    }

    off(key, callback) {
        const cbs = this.events.get(key) || []
        const news = cbs.filter(item=>{
            return item !== callback && item.initialCb !== callback
        })
        this.events.set(key, news)
    }

    once(key, cb) {
        const one = (...args) =>{
            cb(...args)
            this.off(key, one)
        }
        one.initialCb = cb
        this.on(key, one)
    }
}