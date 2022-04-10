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
        if (this.heap[parentIndex].val > this.heap[index].val) {
            this.swap(parentIndex, index)
            this.hiftUp(parentIndex)
        }
    }

    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index)
        const rightIndex = this.getLeftIndex(index)
        if (this.heap[leftIndex].val < this.heap[index].val) {
            this.swap(leftIndex, index)
            this.shiftDown(leftIndex)
        }

        if (this.heap[rightIndex].val < this.heap[index].val) {
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

var mergeKLists = function(lists) {
    const listNode = new ListNode(-1)
    const minHeap = new MinHeap()
    let p1 = listNode
    lists.forEach(item => {
        item && minHeap.insert(item)
    })
    while(minHeap.size()) {
        const n = minHeap.pop()
        p1.next = n
        p1 = p1.next
        if(n.next) {
            minHeap.insert(n.next)
        }
    }
    return p1.next
}