

function deepClone(target, map = new Map()){
    if(typeof target !== 'object') {
        return target
    }
    const temp = Array.isArray(target) ? [] : {}
    if(map.get(target)) {
        return map.get(target)
    }
    map.set(target, temp)
    for(let item in target) {
        temp[item] = deepClone(target[item], map)
    }

    return temp
}

const obj = 
{
    name: 'sunshine_lin',
    age: 23,
    hobbies: { sports: '好家伙', tv: '雍正王朝' },
    works: ['2020', '2021']
}
console.log('res', deepClone(obj))