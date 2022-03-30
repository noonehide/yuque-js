/**
 * 广度优先
 * @param {*} root 
 */
function bfs(root) {
    const list = [root]
    while (root.length) {
        const popData = root.pop()
        console.log('data', popData)
        popData.children.forEach(item => {
            list.push(item)
        })
    }
}


/***
 * 深度优先
 */
function dfs(root) {
    console.log(root.value)
    root.children(item => {
        dfs(item)
    })
}