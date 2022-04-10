/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
 var openLock = function (deadends, target) {
    const deadSets = new Set(deadends)
    const visited = new Set()
    const q = ['0000']
    let step = 0
    while (q.length) {
        const size = q.length
        for (let i = 0; i < size; i++) {
            const n = q.shift()
            if (n === target) {
                return step
            }
            if (visited.has(n)) {
                continue
            }
            if (deadSets.has(n)) {
                continue
            }
            visited.add(n)
            for (let i = 0; i < n.length; i++) {
                const plusN = moveUp(n, i)
                const minusN = moveDown(n, i)
                q.push(plusN)
                q.push(minusN)
            }
        }
        step++
    }
    return -1
};

var moveUp = function (str, i) {
    const a = str.split('')
    if (a[i] === '9') {
        a[i] = '0'
    } else {
        a[i] = Number(a[i]) + 1 + ''
    }
    const res = a.join('')
    return res
}

var moveDown = function (str, i) {
    const a = str.split('')
    if (a[i] === '0') {
        a[i] = '9'
    } else {
        a[i] = Number(a[i]) - 1 + ''
    }
    const res = a.join('')
    return res
}

