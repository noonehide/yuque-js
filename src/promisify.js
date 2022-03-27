const fs = require('fs')
// 使用前
// fs.readFile('./index.js', (err, data) => {
//     if(!err) {
//         console.log(data.toString())
//     }
//     console.log(err)
//  })
// 使用promisify后


function promisify(func) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function (error, data) {
                if (error) {
                    reject(error)
                }
                if (data) {
                    resolve(data)
                }
            })
            func.apply(null, args)
        })
    }
}


const readFile = promisify(fs.readFile)
readFile('./new.js').then(res => {
    console.log('res', res)
}).catch(error => {
    console.log('error', error)
})
