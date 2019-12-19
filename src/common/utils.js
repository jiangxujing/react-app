import _ from 'lodash'
let date = null,
	offSet = 60 * 1000 * (new Date(0)).getTimezoneOffset(),
	week = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六'
	}

// 控制页面字体大小
export const htmlFontSize = () => {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var width = w > h ? h : w;
	width = width > 720 ? 720 : width;
	var fz = ~~(width * 100000 / 36) / 10000;
	fz = 10;
	document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz + 'px';
	var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000;
	if(fz !== realfz) {
		document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px';
	}
	document.getElementsByTagName('html')[0].style.cssText = 'font-size: 10px'
}

export const resetFontSize = (doc, win) => {
	let docEle = doc.documentElement,
		fn = function() {
			setTimeout(function() {
				let width = docEle.clientWidth
				width && (docEle.style.fontSize = 10 * (width / 375) + 'px')
			}, 1000 / 60)
		}
	win.addEventListener('resize', fn, false)
	doc.addEventListener('DOMContentLoaded', fn, false)
	fn()
}

export const resetWindow = () => {
	const resetWidth = () => {
		let winW = window.innerWidth || document.documentElement.clientWidth
		// console.log(winW)
		document.documentElement.style.width = winW + 'px'
		document.body.style.width = winW + 'px'
		document.body.style.overflowX = 'hidden'
		localStorage.setItem('width', winW)
	}


	resetWidth()
	window.addEventListener('resize', () => {
		resetWidth()
	})
	window.addEventListener('orientationchange', () => {
		resetWidth()
	})
	document.addEventListener('focusout', () => {
		window.scrollTo(0, 0)
	})
}

export const dispatchEvent = (target, evt) => {
	if(!evt || evt === '') return false
	let event = document.createEvent('HTMLEvents')
	event.initEvent(evt, true, true)
	event.eventType = 'message'
	target.dispatchEvent(event)
}

export const filterVal = (name, val) => {
	const _filters = {
		bankcardNo() {
			if(val === '') return val
			let card = val.replace(/\D/g, '')
			let ncard = ''
			if(card.length > 19) card = card.slice(0, -1)
			for(let n = 0; n < card.length; n = n + 4) {
				ncard += card.substring(n, n + 4) + " "
			}
			return ncard.replace(/(\s*$)/g, "")
		},
		mobile() {
			val = val.replace(/\D/g, '')
			if(val.length > 11) val = val.slice(0, -1)
			if(!/^1[0-9]*$/.test(val)) val = ''
			return val
		},
		contactPhone() {
			val = val.replace(/\D/g, '');
			if(val.length > 11) val = val.slice(0, -1)
			if(!/^1[0-9]*$/.test(val)) val = ''
			return val
		},
		idNo() {
			// eslint-disable-next-line
			val = val.replace(/[\u4e00-\u9fa5|A-W|a-w|y|z|Y|Z|\s|`~!@#$%^&*()\-=_+\{\}\[\]\|\\;':",\.\<\>\/\?]|([x|X](?!$))/g, '')
			if(val.length > 18) val = val.slice(0, -1)
			return val
		},
		servicePass() {
			val = val.replace(/\D/g, '')
			if(val.length > 8) val = val.substr(0, 8)
			return val
		},
		verifyCode() {
			val = val.replace(/\D/g, '')
			if(val.length > 6) val = val.substr(0, 6)
			return val
		},
		mimeVerifyCode() {
			val = val.replace(/\D/g, '')
			if(val.length > 4) val = val.substr(0, 4)
			return val
		}
	}
	return(typeof _filters[name] === 'function') ? _filters[name].call(this) : val
}

/**
 * 时间格式处理
 **/
export const dateFormatter = (datetime, fmt, fix) => {
	offSet = !fix ? 0 : offSet
	date = datetime instanceof Date ? datetime : new Date(datetime)
	let o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': (date.getHours() % 12) === 0 ? 12 : (date.getHours() % 12), // 小时
		'H+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	if(/(E+)/.test(fmt)) {
		console.log(RegExp.$1)
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + ''])
	}
	for(let k in o) {
		if(new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

/**
 * 设置 cookie
 **/
export const setCookie = (name, value, day) => {
	let exp = new Date()
	day = day || 1
	exp.setTime(exp.getTime() + day * 60 * 60 * 1000 * 24)
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

/**
 * 获取 cookie
 **/
export const getCookie = name => {
	let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
	return arr !== null ? unescape(arr[2]) : null
}

/**
 * 删除 cookie
 **/
export const delCookie = name => {
	let cval = getCookie(name)
	let exp = new Date()
	exp.setTime(exp.getTime() - 1)
	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}



export const convertSecondToTime = sec => {
	if(sec === 0) {
		return sec
	}
	let hh = 0,
		mm = 0,
		ss = 0;
	const step = 60,
		fix = t => {
			return t < 10 ? '0' + t : t + ''
		},
		timeOffset = (t, step) => {
			return [Math.floor(t / step), t % step]
		};

	[mm, ss] = timeOffset(sec, step)
	if(mm > 59) {
		[hh, mm] = timeOffset(mm, step)
	}
	return [fix(hh), fix(mm), fix(ss)].join(':')
}

/*
 * 数组重排方法，
 * @params  origin 原始数组
 *          target 需要挪动的数组
 *          direction 方向 'left' or 'right'
 */
export const reAlignArray = (origin, target, direction) => {
	let newArr = origin ? _.clone(origin) : [],
		index = -1,
		edgeIndex = -1,
		item = null;

	target = target || []
	direction = direction || 'right'

	if(direction === 'right') { // 右移
		edgeIndex = newArr.indexOf(target[target.length - 1])
		if(edgeIndex >= (newArr.length - 1) || edgeIndex === -1) { // 边界条件
			return newArr
		}
		for(let i = target.length - 1; i >= 0; i--) { // 倒序循环
			item = target[i]
			index = newArr.indexOf(item)
			if(index < (newArr.length - 1)) {
				newArr[index] = newArr[index + 1]
				newArr[index + 1] = item
			}
		}
	} else { // 左移
		edgeIndex = newArr.indexOf(target[0])
		if(edgeIndex <= 0 || edgeIndex === -1) { // 边界条件
			return newArr
		}
		target.forEach(item => { // 正序循环
			index = newArr.indexOf(item)
			if(index > 0) {
				newArr[index] = newArr[index - 1]
				newArr[index - 1] = item
			}
		})
	}
	return newArr
}

/**
 * 金钱展示
 **/
export const formatMoney = (amount, fixed) => {
	//  /* 千分位方法，支持小数*/
	const toThousands = num => {
		let arr = [],
			result = '';

		num = (num || 0).toString()
		if(num.indexOf('.') !== -1) {
			arr = num.split('.')
			num = arr[0]
		}
		while(num.length > 3) {
			result = ',' + num.slice(-3) + result
			num = num.slice(0, num.length - 3)
		}
		result = num + result
		result += '.' + arr[1]
		return result
	}
	if(~~(amount) === 0) {
		return '0.00'
	}
	fixed = fixed || 0

	let tmpNumber = fixed === 1 ? (amount / 100).toFixed(2) : parseInt(amount / 100, 10)
	return tmpNumber >= 1000 ? toThousands(tmpNumber) : tmpNumber
}
/**
 * 表格处理 空 为 '/'
 **/
export const emptyFormat = (row, column) => {
	let data = row[column.property]
	return data ? data : '/'
}


export const checkTel = () => {
	let strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	return strTemp
}

/*
 * 设置中文字符输入长度
 */
export const getByteLen = (value) => {
	let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
	let mat = value.match(cnReg)
	let length
	if (mat) {
		length = (mat.length + (value.length - mat.length) * 0.5)
	} else {
		length = value.length * 0.5
	}
	return length
}

/*
 * 校验
 */
export const checkRules = (value, type) => {
	const rules = {
		// mobileReg: /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|166|198|199)+\d{8}$/,								// 手机号
		mobileReg: /^(1)+\d{10}$/,								// 手机号
		nameReg: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,		// 中文姓名
		chineseReg: /^[\u4e00-\u9fa5]*$/,						// 中文
		idCardNoReg: /^(^\d{18}$)|(^\d{17}(\d|X|x)$)$/,			// 身份证
		positiveIntegerReg: /^[1-9]\d*$/,						// 正整数
		integerReg: /^\d+$/										// 整数
	}
	if (!rules[type]) {
		return false
	}
	return rules[type].test(value)
}
export const getQueryString = (key) => {
	let hashSearch = window.location.href.split('?')[1]
	let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)")
	if(hashSearch) {
		let result = hashSearch.match(reg)
		return result ? decodeURIComponent(result[2]) : null
	}
}
export const getPayType = (value) =>{
	if(value==='WX'){
		return '微信'
	}else if(value === 'ALIPAY'){
		return '支付宝'
	}else if(value === 'MM_INSTALMENT'){
		return '米么分期'
	}else if(value === 'BAK'){
		return '银行卡支付'
	}
}
export default {
	htmlFontSize,
	dateFormatter,
	setCookie,
	getCookie,
	delCookie,
	convertSecondToTime,
	reAlignArray,
	formatMoney,
	emptyFormat,
	resetFontSize,
	resetWindow,
	checkTel,
	getByteLen,
	checkRules,
	getQueryString,
	getPayType
}