import axios from 'axios'
import _ from 'lodash'
import ApiList from './api.json'
let CancelToken = axios.CancelToken
let cancel

// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

const prefix = '/hido-core'
const _parseJSON = str => {
    if (typeof str === 'object') {
        return str
    }
    try {
        return JSON.parse(str)
    } catch (ex) {}
    return (new Function('', 'return ' + str))()
}

const getUrl = key => {
    if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
        return ''
    }
    let url = prefix + ApiList[key]
    return url
}
const postExcel = (url, data) => {
     let token = localStorage.getItem('token')
    const sec = 6000
    let postData = {}

    if (data) {
        data = filterNull(data)
    }

    let _data = _.assign({}, data)
    _.forEach(_data, (val, key) => {
        if (['timeout'].indexOf(key) === -1) {
            postData[key] = val
        }
    })

    let timeout = _data['timeout'] || 10 * sec

    return axios({
        method: 'post',
        url: url,
        async:false,
        data: postData,
        responseType:'blob',
        timeout: timeout,
        headers: { 'token': token },
        CancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
        })
    }).then(function(resp) {
        if (resp.status >= 200 && resp.status < 300) {
            let respData = resp.data
           
          /*  alert(respData['code'])*/
            return Promise.resolve(respData)
        }
        return Promise.reject(new Error(resp.status))
    }).catch(function(err) {
        console.log(err)
        return Promise.reject(new Error(err))
    })
}


// 一般请求
const post = (url, data) => {
     let token = localStorage.getItem('token')
    const sec = 6000
    let postData = {}

    if (data) {
        data = filterNull(data)
    }

    let _data = _.assign({}, data)
    _.forEach(_data, (val, key) => {
        if (['timeout'].indexOf(key) === -1) {
            postData[key] = val
        }
    })

    let timeout = _data['timeout'] || 10 * sec

    return axios({
        method: 'post',
        url: url,
        async:false,
        data: postData,
        timeout: timeout,
        headers: { 'token': token },
        CancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
        })
    }).then(function(resp) {
        if (resp.status >= 200 && resp.status < 300) {
            let respData = resp.data
           respData['code'] = ~~(respData['code'])
            if(typeof(respData['content']) === 'string'){
            }else{
            	 respData['content'] = _parseJSON(respData['content'])
            }
            return Promise.resolve(respData)
        }
        return Promise.reject(new Error(resp.status))
    }).catch(function(err) {
        console.log(err)
//      MessageBox.alert('网络不可用，请稍后再试', '提示', {
//          confirmButtonText: '确定',
//          callback: action => {}
//      })
        return Promise.reject(new Error(err))
    })
}
/**
 * 上传(不需要对数据做过滤处理)
 **/
const upload = (url, data) => {
    let token = localStorage.getItem('token')
    const sec = 6000

    let timeout = 10 * sec

    return axios({
        method: 'post',
        url: url,
        data: data,
        timeout: timeout,
        headers: { 'token': token },
        CancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
        })
    }).then(function(resp) {
        if (resp.status >= 200 && resp.status < 300) {
            let respData = resp.data
            respData['code'] = ~~(respData['code'])
            return Promise.resolve(respData)
        }
        return Promise.reject(new Error(resp.status))
    }).catch(function(err) {
        console.log(err)
        return Promise.reject(new Error(err))
    })
}



const get = (url, params) =>{
  if (params) {
    params = filterNull(params)
  }
  return axios({
    method: 'get',
    url: url,
    params: params,
    withCredentials: false
  })
   .then(function(resp) {
        if (resp.status >= 200 && resp.status < 300) {
            let respData = resp.data
            respData['code'] = ~~(respData['code'])
            return Promise.resolve(respData)
        }
        return Promise.reject(new Error(resp.status))
    }).catch(function(err) {
        console.log(err)
//      Toast('网络异常，请稍后再试', '提示')
        return Promise.reject(new Error(err))
    })
}
// 返回在vue模板中的调用接口
export default {
    getUrl,
    postExcel,
    post,
    upload,
    get,
    cancel: () => {
        cancel && cancel()
    }
}
