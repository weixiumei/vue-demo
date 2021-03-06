import { commonRequest, ERR_OK, INVALID_TOKEN } from './config'
// import {postFile, commonRequest, ERR_OK, ERROR_SERVICE, INVALID_TOKEN, ERR_MSG, LOG_OUT} from './config'
import axios from 'axios'
import Vue from 'vue'
//获取token
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
var TOKEN = getUrlParameter('token')
if (TOKEN) {
    localStorage.setItem('WPDF_TOKEN', TOKEN)
}

var shop_id = getUrlParameter('shop_id')
if (shop_id) {
    localStorage.setItem('shop_id', shop_id)
}

var login_name = getUrlParameter('login_name')
if (login_name) {
    localStorage.setItem('login_name', login_name)
}
// POST/GET/PUT/DELETE 请求
function Request(url, method, params, data, visible = true, errcb) {
    // if (visible) Vue.prototype.$loading()
    return new Promise(function(resolve, reject) {
        axios(commonRequest(url, method, params, data)).then((res) => {
            // Vue.prototype.$loading.close()
            if (res.data.code == ERR_OK) {
                resolve(res.data)
            } else if (res.data.code === INVALID_TOKEN) {
                // Vue.prototype.$alert(res.data.message, '提示', {
                //     confirmButtonText: '确定'
                // })
                alert(res.data.message);
            } else if (errcb) {
                resolve(res.data)
            } else {
                // success
                if(res.data.code!=0){
                    alert(res.data.message);
                }else{
                    resolve(res.data)
                }
                
                // Vue.prototype.$alert(res.data.message, '提示', {
                //     confirmButtonText: '确定'
                // })
                // alert(res.data.message);
            }
        }).catch(err => {
            // Vue.prototype.$loading.close()
            // Vue.prototype.$message.error(err.message)
            reject(err)
        })
    })
}

/**
 * 说明
 * Request方法接收6个参数
 * 依次为：请求地址，请求方法，params（get方法用，不是要用undefined做占位符），data（post 方法用，不是要用undefined占位符），visible（bool 值，是否显示 loadding），errcb（bool 值，是否返回错误回调）
 */

// 接口
/**
 * 查询任务list
 */
export function GET_MARKETING_TASK_LIST(data) {
    return Request('/api/v6/c_minipeace/marketing_task/marketing_task_list/get', 'POST', undefined, data, false)
}

/**
 * 更新任务接口
 */
export function UPDATE_TASK_INFO(data) {
    return Request('/api/v6/c_minipeace/marketing_task/update_info/post', 'POST', undefined, data, false)
}