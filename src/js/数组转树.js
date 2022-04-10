const nodes = [{
    "id": 2,
    "title": '第一个',
    "parentId" : 0
},{
    "id": 3,
    "title": '第一个',
    "parentId" : 2
},{
    "id": 4,
    "title": '第一个',
    "parentId" : 3
}]


function convertToTreeData(data, pid) {
    const result = []
    let temp = []
    for(let i = 0; i < data.length; i++){
        if(data[i].parentId === pid) {
            const obj = {'title': data[i].title, 'id': data[i].id}
            temp = convertToTreeData(data, data[i].id)
            if(temp.length > 0) {
                obj.children = temp
            }
            result.push(obj)
        }
    }
    return result
}

const tee = convertToTreeData(nodes, 0)
console.log('te', JSON.stringify(tee))