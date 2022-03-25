class LruCache{
    constructor(size){
        this.size = size
        this.cache = new Map()
    }


    get(key) {
        const hasKey = this.cache.has(key)
        if(hasKey){
            const res = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, res)
            return res
        }
        return undefined
    }

    set(key, value) {
        if(this.cache.has(key)) {
            this.cache.delete(key)
        }
        this.cache.set(key, value)
        if(this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}