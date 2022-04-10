class MinHeap {
    constructor() {
        this.heap = []
    }

    // 插入，时间复杂度O(logk)
    insert(value) {
        this.heap.push(value)
        this.shiftUp(this.heap.length - 1)
    }

    // 查找父节点index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    getLeftIndex(index) {
        return index * 2 + 1
    }

    getRightIndex(index) {
        return index * 2 + 2
    }

    // 交换操作
    swap(i1, i2) {
        let temp = this.heap[i1]
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }

    // 上移操作
    shiftUp(index) {
        if(index === 0) {
            return 
        }
        const parentIndex = this.getParentIndex(index)

        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index)
            this.shiftUp(parentIndex)
        }
    }

    // 下移
    shiftDown(index){
        const leftIndex = this.getLeftIndex(index)
        const rightIndex = this.getRightIndex(index)
        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index)
            this.shiftDown(leftIndex)
        }

        if(this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index)
            this.shiftDown(rightIndex)
        }
    }

    // 下移方法
    pop(){
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
    }
 
    // 获取堆顶
    peek(){
        return this.heap[0]
    }
     
    // 获取堆大小
    size(){
        return this.heap.length
    }
}

const minHeap = new MinHeap()

minHeap.insert(3)
minHeap.insert(2)
minHeap.insert(1)
minHeap.pop()
console.log('xxx', minHeap.heap)