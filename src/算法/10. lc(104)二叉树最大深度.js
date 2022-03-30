/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
    let max = 0
    function dfs(data, level) {
        if(!data) return
        // 优化:判断是叶子节点
        if(!data.left && !data.right){
            max = Math.max(max, level)
        }
        dfs(data.left, level + 1)
        dfs(data.right, level + 1)
    }
    dfs(root, 1)
    return max
};