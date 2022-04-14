// 递归写法，会有性能问题
var climbStairs = function (n) {
    const rec = (i) => {
        if (i <= 2) return i
        return rec(i - 1) + rec(i - 2)
    }
    return rec(n)
}

// 加入一个备忘录，存储已经递归过的值
var climbStairs2 = function (n) {
    const list = new Array(n + 1).fill(-1)
    const rec = (i) => {
        if (i <= 2) return i
        if (list[i] !== -1) return list[i]
        list[i] = rec(i - 1) + rec(i - 2)
        return list[i]
    }
    return rec(n)
}

// 更简易？
var climbStairs3 = function (n) {
    if (n <= 2) return n
    const dp = [1, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}
