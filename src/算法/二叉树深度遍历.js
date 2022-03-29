function dps (node) {
    const stack = []
    const res = []
    stack.push(node)
    while(stack.length) {
        const rf = stack.pop()
        const value = rf.value
        res.pus(value)
        
        rf.right && stack.push(rf.right)
        rf.left && stack.push(rf.left)
    }
}