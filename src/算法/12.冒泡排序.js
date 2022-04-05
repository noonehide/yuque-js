/*
* 时间复杂度O(n^2)
*/
Array.prototype.bubbleSort = function () {
    for(let i = 0; i< this.length - 1; i++) {
        for (let j = 0; j < this.length - 1 - i; j++) {
            if (this[j] > this[j + 1]) {
                swap(this, this[j], this[j + 1])
            }
        }
    }
}

function swap(arr, i1, l2) {
    let temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp
}

const arr = [5,4,2,3,1]
arr.sort()
console.log('arr', arr)