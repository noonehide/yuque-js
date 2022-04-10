(function () {
    const ele = document.createElement("div");
    ele.width = "1000px";
    setTimeout(() => {
        ele.width = "500px";
        console.log(1, ele.width);
        setTimeout(() => {
            console.log(2, ele.width);
        });
    });

    Promise.resolve().then(() => {
        console.log(3, ele.width);
       
    });

    requestAnimationFrame(() => {
        console.log(5, ele.width);
        requestAnimationFrame(() => {
            console.log(6, ele.width);
        });
    });

    console.log(7, ele.width);
})();