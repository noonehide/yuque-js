const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'

class EasyPromise {
    constructor(executor) {
        this.status = PENDING
        this.fullfilledCallbacks = []
        this.rejectedCallbacks = []
        this.value = undefined
        this.reason = undefined
        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            while (this.fullfilledCallbacks.length) {
                this.fullfilledCallbacks.shift()(value)
            }
        }
    }


    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.rejectedCallbacks.length) {
                this.rejectedCallbacks.shift()(reason)
            }
        }
    }

    catch(func) {
        this.then(null, func)
    }

    then(onFulfilled, onReject) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        const realOnRejected = typeof onReject === 'function' ? onReject : reason => {throw reason};
    
        const promise2 = new EasyPromise((resolve, reject) => {
            const microFullfilled = queueMicrotask(() => {
                try {
                    const x = realOnFulfilled(this.value)
                    // 传入 resolvePromise 集中处理
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })

            const microRejected = queueMicrotask(() => {
                try {
                    const x = realOnRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
            if (this.status === FULFILLED) {
                microFullfilled()
            } else if (this.status === REJECTED) {
                microRejected()
            } else {
                this.fullfilledCallbacks.push(microFullfilled);
                this.rejectedCallbacks.push(microRejected);
            }
        })

        return promise2
    }

    // resolve 静态方法
    static resolve(parameter) {
        // 如果传入 EasyPromise 就直接返回
        if (parameter instanceof EasyPromise) {
            return parameter;
        }

        // 转成常规方式
        return new EasyPromise(resolve => {
            resolve(parameter);
        });
    }

    // reject 静态方法
    static reject(reason) {
        return new EasyPromise((resolve, reject) => {
            reject(reason);
        });
    }


    static race(promises) {
        return new EasyPromise((resolve, reject) => {
            promises.forEach(item => {
                item.then(res => {
                    resolve(res)
                })
            }, error => {
                reject(error)
            })
        })
    }

    static all(promises) {
        return new EasyPromise((resolve, reject) => {
            const ress = []
            let count = 0
            promises.forEach((item, index) => {
                promises.then(res => {
                    count++
                    ress[index] = res
                    if (count === promises.length) {
                        resolve(ress)
                    }
                }, () => {
                    reject(error)
                })
            })
        })
    }

    static allSettled(promises) {
        return new EasyPromise((resolve, reject) => {
            //
            const all = []
            const count = 0
            promises.forEach((item, index) => {
                item.then(res => {
                    count++
                    all[index] = {
                        status: 'fullfilled',
                        value: res
                    }
                    if (count === promises.length) {
                        resolve(all)
                    }
                })
            }, error => {
                count++
                all[index] = {
                    status: 'rejectd',
                    value: error
                }
                if (count === promises.length) {
                    resolve(all)
                }
            })
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是不是 EasyPromise 实例对象
    if (x instanceof EasyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject)
    } else {
        // 普通值
        resolve(x)
    }
}