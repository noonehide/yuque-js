/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }a
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
    convert(root)
    return root
};


var convert = function(root) {
    if(!root) return
    const temp = root.left
    root.left = root.right
    root.right = temp
    convert(root.left)
    convert(root.right)
}