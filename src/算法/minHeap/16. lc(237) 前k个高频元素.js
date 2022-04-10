class MinHeap {
    constructor() {
        this.heap = []
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    getLeftIndex(index) {
        return (index * 2) + 1
    }

    getRightIndex(index) {
        return (index * 2) + 2
    }

    swap(i1, i2) {
        const temp = this.heap[i1]
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }


    shiftUp(index) {
        const parentIndex = this.getParentIndex(index)
        if (this.heap[parentIndex].value > this.heap[index].value) {
            this.swap(parentIndex, index)
            this.hiftUp(parentIndex)
        }
    }

    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index)
        const rightIndex = this.getLeftIndex(index)
        if (this.heap[leftIndex].value < this.heap[index].value) {
            this.swap(leftIndex, index)
            this.shiftDown(leftIndex)
        }

        if (this.heap[rightIndex].value < this.heap[index].value) {
            this.swap(rightIndex, index)
            this.shiftDown(rightIndex)
        }
    }

    insert(value) {
        this.heap.push(value)
        shiftUp(this.heap.length - 1)
    }

    pop() {
        if (this.heap.length === 1) {
            return this.heap.shift()
        }
        const top = this.heap[0]
        this.heap[0] = this.heap.pop()
        shiftDown(0)
        return top
    }

    peek() {
        return this.heap[0]
    }

    size() {
        return this.heap.length
    }
}


var topKFrequent1 = function (nums, k) {
    const map = new Map()
    nums.forEach(item => {
        map.set(item, map.has(item) ? map.get(item) + 1 : 1)
    })

    const array = Array.from(map)

    array.sort((a, b) => {
        return b[1] - a[1]
    })
    return array.slice(0, k).map(item => {
        return item[0]
    })
}


var topKFrequent2 = function (nums, k) {
    const map = new Map()
    const minHeap = new MinHeap()
    nums.forEach(item => {
        map.set(item, map.has(item) ? map.get(item) + 1 : 1)
    })

    map.forEach((value, key) => {
        minHeap.insert({
            value,
            key
        })
        if (minHeap.size() > k) {
            minHeap.pop()
        }
    })
    return minHeap.heap.map(item => {
        return item.key
    })
}
