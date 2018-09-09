export const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
// 将对象元素转换成字符串以作比较
function obj2key(obj, keys) {
    var n = keys.length
    var key = []
    while (n--) {
        key.push(obj[keys[n]])
    }
    return key.join('|')
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1))
    var sURLVariables = sPageURL.split('&')
    var sParameterName, i
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? '' : sParameterName[1]
        }
    }
}
export const user_id = getUrlParameter('user_id') || ''

// 对象去重
export function uniqeByKeys(array, keys) {
    var arr = []
    var hash = {}
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys)
        if (!(k in hash)) {
            hash[k] = true
            arr.push(array[i])
        }
    }
    return arr
}

// 数组去重
export function dedupe(array) {
    return Array.from(new Set(array))
}
// 去除抖动
export function debounce(method, delay) {
    var timer = null;
    // return function() {
    var context = this,
        args = arguments;
    // clearTimeout(timer);
    timer = setTimeout(function() {
        method.apply(context, args);
    }, delay);
    // }
}