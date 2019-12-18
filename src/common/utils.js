import _ from 'lodash'

const ua = navigator.userAgent.toLowerCase(), //判断浏览器类型 
	arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], // 加权因子
	arrValid = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验码

let date = null,
	sysPlatform = '',
	cookiePosBegin = -1,
	cookiePosEnd = -1,
	offSet = 60 * 1000 * (new Date(0)).getTimezoneOffset(),
	week = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六'
	},
	regObj = {
		'chsName': /^[\u4E00-\u9FFF]([\u4E00-\u9FFF]{0,3})[\u4E00-\u9FFF]$/, // 2-5汉字
		'vCode4': /^\d(\d{2})\d$/, // 4位验证码
		'vCode6': /^\d(\d{4})\d$/, // 6位验证码
		'mobile': /^1\d{10}$/, // 通用手机号
		'email': /^(\w)+[(\.\w+)|(\-\w+)]*@(\w)+(([\.|\-]\w+)+)$/, // 邮箱
		'strongPwd': /^(?=.*[A-Za-z]+)(?=.*\d+)(?=.*[\~\!\@\#\$%\^&\*\(\)_\+\{\}\:\;\"\"\'\/\`\?\<\>\.\,\[\]\-\=\\\|]+)[A-Za-z\d\x21-\x7e]{8,16}$/ // 强密码
	},
	regFunc = {
		idNum(cid) {
			if(/^\d{17}(\d|x|X)$/i.test(cid)) {
				let sum = 0,
					idx = 0;
				for(let i = 0; i < cid.length - 1; i++) { // 对前17位数字与权值乘积求和
					sum += parseInt(cid.substr(i, 1), 10) * arrExp[i]
				}
				idx = sum % 11 // 计算模（固定算法）
				return arrValid[idx] === cid.substr(17, 1).toUpperCase() // 检验第18为是否与校验码相等
			} else if(/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(cid)) {
				return true
			} else {
				return false
			}
		}
	},
	crypts = {
		encode(val) {
			if(val === undefined) {
				return window.encodeURIComponent('')
			}

			if(typeof val === typeof 1) {
				val += ''
			}

			if(_.isObject(val)) {
				return window.encodeURIComponent(JSON.stringify(val))
			} else if(typeof val === typeof 'a') {
				return window.encodeURIComponent(val)
			} else {
				return window.encodeURIComponent('')
			}
		},
		decode(val) {
			try {
				return JSON.parse(window.decodeURIComponent(val))
			} catch(e) {
				return window.decodeURIComponent(val)
			}
		}
	};

if(/iphone|ipad|ipod/.test(ua)) { //调用设备对象的test方法判断设备类型
	sysPlatform = 'IOS'
} else if(/android/.test(ua)) {
	sysPlatform = 'ANDROID'
} else {
	sysPlatform = ''
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
		// evt = 'orientationchange' in window ? 'orientationchange' : 'resize,
		fn = function() {
			setTimeout(function() {
				let width = docEle.clientWidth
				width && (docEle.style.fontSize = 10 * (width / 375) + 'px')
			}, 1000 / 60)
		}
	'orientationchange' in win ? win.addEventListener('orientationchange', fn, false) : ''
	win.addEventListener('resize', fn, false)
	doc.addEventListener('DOMContentLoaded', fn, false)
	fn()
}

export const resetWindow = () => {
	// 重设 viewport 的 height ，防止在 ios 低版本下高度的bug
	const resetViewHeight = (h) => {
		let vpList = document.getElementsByName('viewport')
		_.forEach(vpList, vp => {
			let content = vp.getAttribute('content')
			vp.setAttribute('content', content.replace(/height=.+?,/gi, 'height=' + h + ','))
		})
	}

	const resetWidth = () => {
		let winW = window.innerWidth || document.documentElement.clientWidth
		// console.log(winW)
		document.documentElement.style.width = winW + 'px'
		document.body.style.width = winW + 'px'
		document.body.style.overflowX = 'hidden'
		localStorage.setItem('width', winW)
	}

	const resetHeight = () => {
		let winH = window.innerHeight || document.documentElement.clientHeight
		// console.log(winH)
		document.documentElement.style.height = winH + 'px'
		document.body.style.height = winH + 'px'
		let pageContainers = document.querySelectorAll('.page-container')
		_.forEach(pageContainers, pc => {
			pc.style.minHeight = winH + 'px'
			pc.style.height = winH + 'px'
		})
		sysPlatform === 'IOS' ? resetViewHeight(winH) : ''
		// console.log('window height:' + winH)
	}

	resetWidth()
	resetHeight()
	window.addEventListener('resize', () => {
		resetWidth()
		resetHeight()
	})
	window.addEventListener('orientationchange', () => {
		resetWidth()
		resetHeight()
	})
	document.addEventListener('focusout', () => {
		window.scrollTo(0, 0)
	})

	// ios下解决点出去不失焦的问题
	const objBlur = (item, time) => {
		time = time || 300
		let obj = item,
			docTouchend = event => {
				if(event.target !== obj) {
					setTimeout(() => {
						obj.blur()
						document.removeEventListener('touchend', docTouchend, false)
					}, time)
				}
			}
		if(obj) {
			obj.addEventListener('focus', () => {
				document.addEventListener('touchend', docTouchend, false)
			}, false)
		}
	}

	if(sysPlatform === 'IOS') {
		let ipts = document.querySelectorAll('input')
		_.forEach(ipts, item => {
			// eslint-disable-next-line
			let input = new objBlur(item)
			input = null
		})
	}
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
 * 格式校验
 **/
export const validator = (val, type) => {
	if(type === 'idNum') {
		return regFunc.idNum(val)
	} else if(typeof type === typeof 'a' && !!regObj[type]) {
		return regObj[type].test(val)
	} else {
		return false
	}
}

/**
 * 时间差
 **/
export const timeInterval = (endDate, startDate) => {
	let diff = endDate.getTime() - startDate.getTime() // 时间差的毫秒数  
	let days = Math.floor(diff / (24 * 3600 * 1000)) // 计算出相差天数  
	//计算出小时数  
	let leave1 = diff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数  
	let hours = Math.floor(leave1 / (3600 * 1000))
	//计算相差分钟数  
	let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数  
	let minutes = Math.floor(leave2 / (60 * 1000))
	//计算相差秒数  
	let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数  
	let seconds = Math.round(leave3 / 1000)

	let returnStr = seconds + "秒"
	minutes > 0 ? returnStr = minutes + "分" + returnStr : ''
	hours > 0 ? returnStr = hours + "小时" + returnStr : ''
	days > 0 ? returnStr = days + "天" + returnStr : ''

	return returnStr
}

/**
 * 时间格式处理
 **/
export const dateFormatter = (datetime, fmt, fix) => {
	offSet = !fix ? 0 : offSet
	// date = datetime instanceof Date ? datetime : new Date(+datetime + offSet)
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
	cval !== null ? document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() : ''
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
		num ? result = num + result : ''
		arr.length > 0 ? result += '.' + arr[1] : ''
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
 * 获取支付方式名称
 */
export const getpPayType = (value) => {
	let label = 'value'
	const payType = [{
		value: 'WX',
		label: '微信'
	}, {
		value: 'ALIPAY',
		label: '支付宝'
	}, {
		value: 'MM_INSTALMENT',
		label: '米么分期'
	}, {
		value: 'BANK',
		label: '银行卡支付'
	}]
	payType.forEach(item => {
		item.value === value ? label = item.label : '' 
	})
	return label
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
export default {
	htmlFontSize,
	validator,
	dateFormatter,
	setCookie,
	getCookie,
	delCookie,
	convertSecondToTime,
	reAlignArray,
	formatMoney,
	emptyFormat,
	timeInterval,
	resetFontSize,
	resetWindow,
	checkTel,
	getByteLen,
	getpPayType,
	checkRules,
	getQueryString
}