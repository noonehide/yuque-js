function dps(node) {
    const stack = [node]
    const res = []
    while (stack.length) {
        const rf = stack.pop()
        const value = rf.value
        res.push(value)

        rf.right && stack.push(rf.right)
        rf.left && stack.push(rf.left)
    }
    return res
}

/**
 * 递归版本
 * @param {*} node 
 */
function dpsTwo(node) {
    console.log(node)
    dpsTwo(node.left)
    dpsTwo(node.right)
}

/**
 * 广度优先遍历
 */
function bps(node) {
    const stack = [node]
    while (stack.length) {
        const n = stack.shift()
        console.log('n', n.val)
        n.left && stack.push(n.left)
        n.right && stack.push(n.right)
    }
}