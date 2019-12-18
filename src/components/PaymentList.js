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
			actualAmount:getQueryString('actualAmount')
		}
	}
	componentDidMount() {
		console.log()
	}
	reservePay(){
		let req = {
			businessNo:this.props.location.search.split('?businessNo=')[1],
			payType:'WX_H5'
		}
		api.post(api.getUrl('reservePay','/hido-core'), req).then(res => {
			if(res.code === '000'){
				window.location.href = JSON.parse(res.content.respExt).mWebUrl
			}
		}).catch(() => {})
	}
	orderPay(){
		let req = {
			businessNo:this.props.location.search.split('?businessNo=')[1],
			payType:'WX_H5'
		}
		api.post(api.getUrl('orderPay','/hido-core'), req).then(res => {
			if(res.code === '000'){
				window.location.href = JSON.parse(res.content.respExt).mWebUrl
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
	render() {
		return(
			<div className="paymentList">
				<div style={{background:'#fff',textAlign:'center'}}>
					<div className='pay-title'>需支付</div>
					<div className="pay-amount"><span style={{fontSize:'2.8rem',fontWeight:'600'}}>￥</span>{this.state.actualAmount}</div>
				</div>
				<div style={{background:'#fff',marginTop:'1rem',height:'6.5rem',lineHeight:'6.5rem',paddingLeft:'1.5rem'}}>
					<img src={require('../image/weixin.png')} style={{width:"4rem"}}/>
					<span style={{color:'#1A2833',fontSize:'1.7rem',paddingLeft:'1.5rem'}}>微信支付</span>
					<img src={require('../image/gouxuan@2x.png')} style={{width:"2.2rem",float:'right',paddingTop:'2rem',marginRight:'1.5rem'}}/>
				</div>
				<div className="buyBtn" onClick={this.buy}>立即支付</div>
			</div>
		)
	}
}
export default PaymentList;