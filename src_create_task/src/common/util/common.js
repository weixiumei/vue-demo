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

// yyyy-mm-dd
export function get_date_format (date){
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth()+1;
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
}

// 某日期向前/向后推几个月
export function GetPreMonthDay (date,monthNum) {
      var dateArr = date.split('-');
      var year = dateArr[0]; //获取当前日期的年份
      var month = dateArr[1]; //获取当前日期的月份
      var day = dateArr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year-parseInt(monthNum/12);
      var month2 = parseInt(month) - monthNum;
      if (month2 <=0) {
       year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : parseInt(month2) / 12);
       month2 = 12 - (Math.abs(month2) % 12);
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
       day2 = days2;
      }
      if (month2 < 10) {
       month2 = '0' + month2;
      }
      var t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
}