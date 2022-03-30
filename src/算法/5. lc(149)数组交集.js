/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 时间复杂度O(m * n)
 * 空间复杂度O(n)
 */
var intersection = function (nums1, nums2) {
    const set1 = new Set(nums1);
    const list = [...set1].filter(item => {
        return nums2.includes(item)
    })
    return [...list]
};



//第二种解法
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 时间复杂度O(m + n)
 * 空间复杂度O(n)
 */
 var intersection = function(nums1, nums2) {
    const map = new Map()
    nums1.forEach(item=>{
      map.set(item, true)
    })
    const res = []
    nums2.forEach(item=>{
      if(map.get(item)){
        res.push(item)
        map.delete(item)
      }
    })
    return res
};