var guessNumber = function (n) {
    const rec = (low, high) => {
        if(low > high) return
        const mid = Math.floor(low, high)
        const res = guess(mid)
        if (res === 0) {
            return mid
        } else if (res === 1) {
            return rec(mid + 1, high)
        } else {
            return rec(low, mid - 1)
        }
    }
    rec(1, n)
}