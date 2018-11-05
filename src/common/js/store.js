// 前端存储函数

export function saveToLocal(id,key,val){
    let  seller = localStorage.__seller__;  // 表明私有的   local key 的名字
    // console.log(seller);
    if(!seller){
        seller = {};
        seller[id] = {};
        seller[id][key] = val;
    }else{
        seller = JSON.parse(seller);
        if(!seller[id]){
            seller[id] = {};
            seller[id][key] = val;
        }else{
            seller[id][key] = val;
        }
    }
    
    localStorage.__seller__ = JSON.stringify(seller);

}

// 从local 读出数据
export function loadFromLocal(id,key,def){
    let seller = localStorage.__seller__;
    if(!seller){
        return def; // 如果没有返回默认的
    }else{
        seller = JSON.parse(seller)[id];
        if(!seller){
            return def;
        }else{
            let ret = seller[key];
            return ret || def;
        }
    }
}