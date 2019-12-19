import React, {
	Component
} from 'react';
import '../css/paymentList.scss'
import api from '../common/api.js'
import {getQueryString} from '../common/utils.js'
class PaymentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tel: '',
			teltrue: false,
			reserveDetail:{},
			actualAmount:getQueryString('actualAmount'),
			h5paysuccess:false
		}
	}
	componentDidMount() {
	}
	reservePay(){
		let req = {
			businessNo:getQueryString('businessNo'),
			payType:'WX_H5'
		}
		api.post(api.getUrl('reservePay','/hido-core'), req).then(res => {
			let uri = ''
			uri = window.location.origin + window.location.pathname+'/paymentList?h5paysuccess=true&actualAmount=' + getQueryString('actualAmount')
			console.log(uri)
			let linkUrl = encodeURIComponent(uri)
			setTimeout(() => {
				window.location.href = JSON.parse(res.content.respExt).mWebUrl+'&redirect_url=' + linkUrl
			}, 100)
		}).catch(() => {})
	}
	orderPay(){
		let req = {
			businessNo:this.props.location.search.split('?businessNo=')[1],
			payType:'WX_H5'
		}
		api.post(api.getUrl('orderPay','/hido-core'), req).then(res => {
			if(res.code === 0){
				let uri = ''
				uri = window.location.origin + window.location.pathname+'/paymentList?h5paysuccess=true&actualAmount='+ getQueryString('actualAmount') + '&businessNo=' + getQueryString('businessNo') + '&fromOrder=1'
				let linkUrl = encodeURIComponent(uri)
				setTimeout(() => {
					window.location.href = JSON.parse(res.content.respExt).mWebUrl+'&redirect_url=' + linkUrl
				}, 100)
				
			}
		}).catch(() => {})
	}
	buy=()=>{
		if(getQueryString('fromOrder')){
			this.orderPay()
		}else{
			this.reservePay()
		}
	}
	payFailure=()=>{
		this.setState({
			h5paysuccess:false
		})
	}
	paySuccess=()=>{
		if(getQueryString('fromOrder')){
			this.props.history.push('reservationStatus?fromOrder=1')
		}else{
			this.props.history.push('reservationStatus')
		}
	}
	render() {
		return(
			<div className="paymentList">
				<div style={{background:'#fff',textAlign:'center'}}>
					<div className='pay-title'>需支付</div>
					<div className="pay-amount"><span style={{fontSize:'2.8rem',fontWeight:'600'}}>￥</span>{this.state.actualAmount}</div>
				</div>
				<div style={{background:'#fff',marginTop:'1rem',height:'6.5rem',lineHeight:'6.5rem',paddingLeft:'1.5rem'}}>
					<img alt="weixin" src={require('../image/weixin.png')} style={{width:"4rem"}}/>
					<span style={{color:'#1A2833',fontSize:'1.7rem',paddingLeft:'1.5rem'}}>微信支付</span>
					<img alt="gouxuan" src={require('../image/gouxuan@2x.png')} style={{width:"2.2rem",float:'right',paddingTop:'2rem',marginRight:'1.5rem'}}/>
				</div>
				<div className="buyBtn" onClick={this.buy}>立即支付</div>
				<div className="after-pay-wrapper" style={{display:this.state.h5paysuccess?'block':'none'}}>
					<div className="after-pay-content">
						<div className="pay-title">提示</div>
						<div className="pay-tips">请确认微信支付是否成功</div>
						<div className="border-style"></div>
						<div className="pay-button">
							<div onClick={this.payFailure}>支付失败</div>
							<div onClick={this.paySuccess}>支付成功</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default PaymentList;