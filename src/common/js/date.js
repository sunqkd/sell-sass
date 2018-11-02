export function formaDateTransform(date,fmt){
    // console.log(date.getFullYear());
    // 年份比较特殊外  其他的都是两位
    if(/(y+)/.test(fmt)){ // 以y开头一个或多个字符串  四个y替换成 年份
        // substr 从开始位置向后提起
        fmt = fmt.replace( RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length) )  // 年份已经替换完成
    }

    let o = {
        'M+':date.getMonth() + 1, // 月
        'd+':date.getDate(),   // 天
        'h+':date.getHours(),  // 小时
        'm+':date.getMinutes(), // 分钟
        's+':date.getSeconds(), // 秒
    }
    // 遍历对象 
    // 
    for(let key in o){ // 循环键名
        if( new RegExp(`(${key})`).test(fmt) ){
            let str = o[key] + '';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)? str: padLeftZero(str) );
        }
    }

   return fmt;
}

 // 补零操作  // 加两个00 更通用
function padLeftZero(str){
    return ('00' + str).substr(str.length);
}
