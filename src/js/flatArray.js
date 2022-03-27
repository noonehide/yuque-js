function flatArray(array, depth = 1) {
    //
    if (depth > 0) {
        return array.reduce((pre, current) => {
            return pre.concat(Array.isArray(current) ? flatArray(current, depth - 1) : current)
        }, [])
    }
    return array.slice()
}