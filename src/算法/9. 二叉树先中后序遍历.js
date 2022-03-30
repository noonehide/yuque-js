/**
 * 递归法前序遍历
 * @param {*} root 
 */
 function preOrder(root) {
    if(!root) return
    console.log('data', root.value)
    preOrder(root.left)
    preOrder(root.right)
}

/**
 * 使用栈模拟递归
 * @param {*} root 
 */
function preOrder(root) {
    const stack = [root]

    while (stack.length) {
        const data = stack.pop()
        console.log('data', data)
        data.right && stack.push(data.right)
        data.left && stack.push(data.left)
    }
}


/**
 * 递归法中序遍历
 * @param {*} root 
 */
 function inOrder(root) {
    if(!root) return
    preOrder(root.left)
    console.log('data', root.value)
    preOrder(root.right)
}

/**
 * 非递归法中序遍历
 * @param {*} root 
 */
 function inOrder(root) {
    let p = root; // 指针
    const stack = []
    while(stack.length || p) {
        // 访问所有的左节点
        while(p) {
            stack.push(p.value)
            p = p.left
        }
        // 访问根
        const n = stack.pop()
        console.log('data', n.value)
        p = n.right
    }
}


/**
 * 后序遍历(递归版)
 */
function postOrder(root){
    if(!root) return
    postOrder(left)
    postOrder(right)
    console.log('value', root.value)
}


/**
 * 非递归法后序遍历
 * 从前序遍历修改而来，
 * @param {*} root 
 */

function postOrder(root) {
    const stack = [root]
    const output = []
    while(stack.length) {
        const n = stack.pop()
        output.push(n)
        n.left  && stack.push(n.left)
        n.right && stack.push(n.right)
    }
    while(output.length) {
        const n = output.pop()
        console.log('n',n.value)
    }
}