const grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]

var minPathSum = function (grid) {
    const i = grid.length
    const j = grid[0].length
    const list = new Array(i).fill(-1).map((item, index) => {
        return new Array(j).fill(-1)
    })

    const rec = (m, n) => {
        if (m === 0 && n === 0) return grid[0][0]
        if (m < 0 || n < 0) return Number.MAX_VALUE
        if (list[m][n] !== -1) return list[m][n]
        list[m][n] = Math.min(rec(m - 1, n), rec(m, n - 1)) + grid[m][n]
        return list[m][n]
    }
    return rec(i - 1, j - 1)
}

console.log('minPathSum', minPathSum(grid))