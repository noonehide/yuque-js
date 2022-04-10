setTimeout(function () {
    console.log('1');

    Promise.resolve().then(() => {
        console.log('2')
    })
});

setTimeout(function () {
    console.log('3');

    Promise.resolve().then(() => {
        console.log('4')
    })
});

// 1,2,3,4