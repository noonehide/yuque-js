Array.prototype.sequentialSearch = function (item) {
    for (let i = 0; i < this.length; i++){
        if(this[i] === item){
            return i
        }
    }
    return -1
}


Array.prototype.binarySearch = function (item){
    let low = 0
    let high = this.length - 1

    while(low <= high) {
        const mid = Math.floor((low + high)/2)
        if(this[mid] < item) {
            low = mid + 1
        } else if(this[mid] > item) {
            high = mid - 1
        } else {
            return mid
        }
    }
    return -1
}

const res = [1,2,3,4,5].binarySearch(3)
console.log('res', res)