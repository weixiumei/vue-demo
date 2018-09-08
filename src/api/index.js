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
// POST/GET/PUT/DELETE 请求
function Request(url, method, params, data, visible = true, errcb) {
    // if (visible) Vue.prototype.$loading()
    return new Promise(function(resolve, reject) {
        axios(commonRequest(url, method, params, data)).then((res) => {
            // Vue.prototype.$loading.close()
            if (res.data.errCode == ERR_OK) {
                resolve(res.data)
            } else if (res.data.errCode === INVALID_TOKEN) {
                Vue.prototype.$alert(res.data.message, '提示', {
                    confirmButtonText: '确定'
                })
            } else if (errcb) {
                resolve(res.data)
            } else {
                Vue.prototype.$alert(res.data.message, '提示', {
                    confirmButtonText: '确定'
                })
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
 * 公共内容--左侧分类
 */
export function PUBLIC_LEFTLIST_GET(data) {
    return Request('/peacebird-qy/topic/list_category', 'get', undefined, data, false)
}

/**
 * 公共内容--右侧列表--?category=category1
 */
export function PUBLIC_RIGHTLIST_GET(data) {
    return Request('/peacebird-qy/topic/list_content', 'get', data, undefined, false)
}

/**
 * 我的话术 --创作
 */
export function CREAT_LIST_GET(data) {
    return Request('/peacebird-qy/topic/list_mine', 'get', data, undefined, false)
}

/**
 * --添加
 */
export function ADD_LIST_GET(data) {
    return Request('/peacebird-qy/topic/add', 'POST', undefined, data, false)
}

/**
 * --搜索--?keyword=xxxx
 */
export function SEARCH_LIST_GET(data) {
    return Request('/peacebird-qy/topic/search', 'get', data, undefined, false)
}

/**
 * --点击'复制',次数增加1
 */
export function UPDATE_LIST_NUM(data) {
    return Request('/peacebird-qy/topic/add_use', 'POST', undefined, data, false)
}