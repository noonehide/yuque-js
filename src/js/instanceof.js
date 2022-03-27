

function myInstanceof (a,b) {
    while(true){
        if(a._proto_ === b.prototype) {
            return true
        } else if (a._proto_ === undefined) {
            return false
        }
        a._proto_ = a._proto_._proto_
    }
}