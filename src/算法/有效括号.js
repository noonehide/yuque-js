function isValid(str) {
    const res = []
    for (let i = 0; i < str.length; i++) {
        let c = str[i]
        if (c === '{' || c === '[' || c === '(') {
            res.push(c)
        } else {
            let r = res[res.length - 1]
            if ((r === '{' && c === '}') || (r === '[' && c === ']') || (r === '(' && c === ')')) {
                res.pop()
            }
        }
    }
    return res.length === 0
}