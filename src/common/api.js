import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'

import ApiList from './api.json'
import { message } from 'antd';
import { getCookie,setCookie,delCookie } from './utils.js'
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
const _parseJSON = str => {
    if (typeof str === 'object') {
        return str
    }
    try {
        return JSON.parse(str)
    } catch (ex) {}
}
// 一般请求
//const prefix = '/hido-core'
const getUrl = (key,prefix) => {
    if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
        return ''
    }
    let url = prefix + ApiList[key]
    return url
}

const post = (url, data, noBox,noLoading, noToken,formData) => {
	// 超时
	const sec = 6000
	// body 入参
	data ? data = filterNull(data) : ''
	let postData = {}
	let _data = _.assign({}, data)
	_.forEach(_data, (val, key) => {
		['timeout'].indexOf(key) === -1 ? postData[key] = val : ''
	})
	// header 入参
	let headers = {
	}
	getCookie('mmTicket') ? headers.mmTicket = getCookie('mmTicket') : null
	headers['mmTicket'] ? setCookie('mmTicket', headers['mmTicket'], 7) : null

	let timeout = _data['timeout'] || 10 * sec
	// 请求头
	let axiosHead = {
		method: 'post',
		url: url,
		data: postData,
		timeout: timeout,
		CancelToken: new CancelToken(function executor(c) {
			cancel = c
		})
	}
	!noToken ? axiosHead.headers = headers : ''
	formData ? axiosHead.data = qs.stringify(postData) : ''
	return axios(axiosHead).then(function(resp) {
		if(resp.status >= 200 && resp.status < 300) {
			let respData = _parseJSON(resp.data)
			respData['code'] = ~~(respData['code'])
			respData['content'] = _parseJSON(respData['content'])
			 if(respData['code'] !== 0) {
			 	let statucCode = [111, 1210, 1211, 9999]
			 	 if(statucCode.indexOf(respData['code']) !== -1){
			 	 	delCookie('mmTicket')
			 	 	sessionStorage.setItem('locationurl',window.location.href)
				 	window.location.href = '/login'
				 }
			 	 let desc = respData['desc'] ? respData['desc'] : '网络异常，请稍后再试'
				message.warning(desc)
			}
			return Promise.resolve(respData)
		} else {
			return Promise.reject(new Error(resp.status))
		}
	}).catch(function(err) {
		console.log(err)
		// alert(JSON.stringify(err))
		// Toast(err)
		let desc = '网络异常，请稍后再试'
		message.warning(desc)
	})
}
export const resetFontSize = (doc, win) => {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 10 * (clientWidth / 375) + 'px';
			console.log(docEl.style.fontSize)
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
}
export default {
	getUrl,
	post,
	cancel: () => {
		cancel && cancel()
	}
}