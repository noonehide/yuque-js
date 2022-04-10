var lengthOfLongestSubstring = function(s) {
    let start = 0
    let maxLength = 0
    const map = new Map()
    for(let end = 0; end < s.length; end ++){
        //拿到的左标，必须在滑动窗口内
        if(map.has(s[end]) && map.get(s[end]) >= start) {
            start = map.get(s[end]) + 1
        }
        maxLength = Math.max(maxLength, end - start + 1)

        map.set(s[end], end)
    }
    return maxLength
};