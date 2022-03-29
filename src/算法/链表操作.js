// 删除node
function deleteNode(node) {
    const next = node.next
    node.value = next.val
    node.next = next.next
}

// 翻转链表
function reverseNode(head) {
    let pre = null
    let current = head
    while (current !== null) {
        // 交换
        let next = current.next
        current.next = pre
        // 后移
        pre = current
        current = next
    }
    return pre
}

// 链表相加
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function addNode(l1, l2) {
    
}