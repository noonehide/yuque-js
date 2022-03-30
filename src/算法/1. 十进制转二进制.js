function turn(num) {
    const res = []
    while (num > 0) {
        const data = res % 2
        res.push(data)
        num = Math.floor(num /2)
    }
    return res.reverse().join().replace(/,/g, '')
}