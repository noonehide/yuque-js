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
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
    let l3 = new ListNode(0)
    let p1 = l1
    let p2 = l2
    let p3 = l3
    let carry = 0
    while(p1 || p2) {
        const v1 = p1 ? p1.val : 0
        const v2 = p2 ? p2.val : 0
        const val = v1 + v2 + carry
        carry = Math.floor(val / 10)
        p3.next = new ListNode(val % 10)
        if(p1){
            p1 = p1.next
        }
        if(p2) {
            p2 = p2.next
        }
        p3 = p3.next
    }
    if(carry) {
        p3.next = new ListNode(carry)
    }
    return l3.next;
};


// 环形链表(leetcode 141)
// 快慢指针
function hasCicle(node) {
    let a = node
    let b = node
    while(b) {
        if(a === b) {
            return true
        }
        a = a.next
        b = b.next.next
    }
    return false
}

// 标记法
function hasCicle(node) {
    while(node) {
        if(node.tag){
            return true
        }
        node.tag = true
        node = node.next
    }
    return false
}