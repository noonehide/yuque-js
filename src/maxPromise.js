function maxPromise(promises, limit) {
    const initialPromises = promises.splice(0, limit).map((item, index) => {
        return item.then(() => {
            return index
        })
    })
    return promises.reduce((pre, current) => {
        return pre.then(res => {
            return Promise.race(initialPromises)
        }).then(index => {
            initialPromises[index] = current.then(res => {
                return index
            })
        })
    }, Promise.resolve()).then(res => {
        return Promise.all(initialPromises)
    })
}


const ps = [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(item);
        }, index * 1000);
    });
});

maxPromise(ps, 2).then(res => {
    console.log('res', res)
})