/**
 * @param {string} s
 * @return {string}
 * 时间复杂度：O(n^2),其中 n 是字符串的长度。长度为 11 和 22 的回文中心分别有 nn 和 n-1n−1 个，每个回文中心最多会向外扩展 O(n)O(n) 次
 * 空间复杂度O(1)
 */
var longestPalindrome = function (s) {
    // 思路：从中间开始向两边扩散来判断回文串
    let res = ''
    for (let i = 0; i < s.length; i++) {
        res = getPalindrome(s, i, i).length > res.length ? getPalindrome(s, i, i) : res
        res = getPalindrome(s, i, i + 1).length > res.length ? getPalindrome(s, i, i + 1) : res
    }
    return res
};

var getPalindrome = function (str, l, r) {
    while (l >= 0 && r < str.length && str[l] === str[r]) {
        l--
        r++
    }
    return str.substr(l + 1, r - l - 1)
}