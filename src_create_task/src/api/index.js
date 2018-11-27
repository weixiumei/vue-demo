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
var TOKEN = getUrlParameter('token');
var login_name = getUrlParameter('login_name');
if (login_name) {
    localStorage.setItem('login_name', login_name)
}
var shop_id = getUrlParameter('shop_id');
if (shop_id) {
    localStorage.setItem('shop_id', shop_id)
}
if (TOKEN) {
    localStorage.setItem('WPDF_TOKEN', TOKEN)
}
// POST/GET/PUT/DELETE 请求
function Request(url, method, params, data, visible = true, errcb) {
    if (visible) Vue.prototype.$loading()
    return new Promise(function(resolve, reject) {
        axios(commonRequest(url, method, params, data)).then((res) => {
            Vue.prototype.$loading.close()
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
            Vue.prototype.$loading.close()
            // Vue.prototype.$message.error(err.message)
            reject(err);
            if(err.response.status==500){
                alert('请联系管理员！');
            }
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
 * 门店列表
 */
export function GET_SHOP_LIST(data) {
    return Request('/api/v6/c_minipeace/sale_shop/related_shop_info/get', 'POST', undefined, data)
}

/**
 * 查询等级信息
 */
export function MEMBER_LEVEL_LIST(data) {
    return Request('/api/v6/member/level_info/get', 'POST', undefined, data)
}

/**
 * 查询导购营销会员对象列表
 */
export function MEMBER_LIST(data) {
    return Request('/api/v6/c_minipeace/marketing_member/search_marketing_member_list/get', 'POST', undefined, data)
}

/**
 * 查询任务list
 */
export function GET_MARKETING_TASK_LIST(data) {
    return Request('/api/v6/c_minipeace/marketing_task/master_marketing_task_list/get', 'POST', undefined, data)
}

/**
 * 查询任务info
 */
export function GET_MARKETING_TASK_INFO(data) {
    return Request('/api/v6/c_minipeace/marketing_task/marketing_task_info/get', 'POST', undefined, data)
}

/**
 * 编辑导购营销任务
 */
export function MARKETING_TASK_EDIT_INFO(data) {
    return Request('/api/v6/c_minipeace/marketing_task/create_info/post', 'POST', undefined, data)
}

/**
 * 查询店长相关联的导购
 */
export function GET_SEARCH_RELATED_USERS(data) {
    return Request('/api/v6/c_minipeace/res_users/search_related_users/get', 'POST', undefined, data)
}

/**
 * 更新任务接口
 */
export function UPDATE_TASK_INFO(data) {
    return Request('/api/v6/c_minipeace/marketing_task/update_info/post', 'POST', undefined, data)
}

/**
 * 更新任务会员对象接口
 */
export function UPDATE_MEMBER_INFO(data) {
    return Request('/api/v6/c_minipeace/marketing_task/update_member_info/post', 'POST', undefined, data)
}
