/**
 * 驼峰转下划线
 * @param {*} str 
 * @returns 
 */
function convert(str) {
    return str.replace(/[A-Z]/g, (v)=>{
        return `_${v.toLowerCase()}`
    })
}

/**
 * 下划线转驼峰
 */
function convert2(str) {
    return str.replace(/_([a-z])/g, (_, v)=>{
        return v.toUpperCase()
    })
}