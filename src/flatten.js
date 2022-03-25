const obj = {
    a: {
        b: 1,
        c: 2,
        d: {
            e: 5
        }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3
}

// 转换成
// {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3
//    c: 3
// }


function flatten(data) {
    const res = {}
    function dfs(pre, prefix) {
        //
        if (Array.isArray(pre)) {
            pre.forEach((item, index)=>{
                dfs(item, `${prefix}[${index}]`)
            })
        } else if (typeof pre === 'object') {
            for (let key in pre) {
                dfs(pre[key], `${prefix}${prefix ? '.': ''}${key}`)
            }
        } else {
            res[prefix] = pre
        }
    }
    dfs(data, '')
    return res
}

console.log('res', flatten(obj))