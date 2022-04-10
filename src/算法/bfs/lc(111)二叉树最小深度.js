function minDep(root) {
    let list = [[root], 1]
    while (list.length) {
        const [shiftData, l] = list.shift()
        if (!shiftData.left && !shiftData.right) {
            return l
        }
        shiftData.left && list.push([shiftData.left, l + 1])
        shiftData.right && list.push([shiftData.right, l + 1])
    }
}