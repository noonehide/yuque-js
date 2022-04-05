Array.prototype.quickSort = function () {
    const rec = (arr) => {
        if (arr.length === 1) {
            return arr
        }
        const left = []
        const right = []
        const base = arr[0]
        // 从1开头
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < base) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...rec(left), base, ...rec(right)]
    }

    const res = rec(this)
    console.log(res)
    res.forEach((item, index)=>{
        this[index] = item
    })
}

const arr = [2,4,5,3,1]
arr.quickSort()
// console.log('arr', arr)