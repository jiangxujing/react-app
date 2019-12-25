import React, {
	Component
} from 'react';
import { Input } from 'antd'; 
import '../css/orderDetailPackage.scss'
import {getQueryString} from '../common/utils.js'
import { message } from 'antd';
import api from '../common/api.js'
class OrderDetailPackage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromOrder:getQueryString('fromOrder'),
			name:sessionStorage.getItem('name'),
			phone:sessionStorage.getItem('phone'),
			detailAddress:sessionStorage.getItem('detailAddress'),
			province:sessionStorage.getItem('province'),
  	        city:sessionStorage.getItem('city'),
  	        country:sessionStorage.getItem('country'),
  	        canSubmit:false,
  	        recommendedPhone:'',
  	        loginPhone:'',
  	        giftPackageDetailList:[]
		};
	}
	componentDidMount() {
		this.queryAgent()
		this.queryPackageDetail()
		if(sessionStorage.getItem('country')){
			this.setState({
				canSubmit:true
			})
		}else{
			this.setState({
				canSubmit:false
			})
		}
	}
	queryPackageDetail(){
		let req = {
			packageCode:getQueryString('packageCode')
		}
		api.post(api.getUrl('queryPackage','/collections-web'),req).then(res => {
			sessionStorage.setItem('firstCommissionRatio',res.content.giftPackageDTODetails.firstCommissionRatio)
			sessionStorage.setItem('secondCommissionRatio',res.content.giftPackageDTODetails.secondCommissionRatio)
			let listPicture = res.content.giftPackageDTODetails.listPicture
			let name = res.content.giftPackageDTODetails.name
			let giftPackageDetailList = res.content.giftPackageDTODetails.giftPackageDetailList
			let salesPrice = res.content.giftPackageDTODetails.salesPrice
			if(res.code === 0){
				this.setState({
					listPicture:listPicture,
					title:name,
					giftPackageDetailList:giftPackageDetailList,
					salesPrice:salesPrice
					
				})
			}
		}).catch(() => {})
	}
	queryAgent(){
		api.post(api.getUrl('queryAgent','/hido-core'), {}).then(res => {
			if(!res.content.firstMobile && res.content.mobile){
				this.setState({
					recommendedPhone:res.content.mobile
				})
			}
			this.setState({
				loginPhone:res.content.loginMobile,
				firstMobile:res.content.firstMobile,
				mobile:res.content.mobile
			})
		}).catch(() => {})
	}
	getUserInfo=()=>{
		this.props.history.push('deliveryInformation')
	}
	onChange=(e)=>{
		if(e.target.value === this.state.loginPhone){
			message.warning('推荐人手机号不能是登录手机号')
		}
		this.setState({
			recommendedPhone:e.target.value
		})
	}
	submit=()=>{
		const  mobileReg  =  /^(1)+\d{10}$/
		if(this.state.recommendedPhone === this.state.loginPhone){
			message.warning('推荐人手机号不能是登录手机号')
		}else if(this.state.recommendedPhone){
			if(!mobileReg.test(this.state.recommendedPhone)) {
				message.warning('请输入11位有效手机号')
			}
		}else{
			this.props.history.push('paymentList?packageCode='+getQueryString('packageCode')+'&actualAmount='+this.state.salesPrice/100+'&fromPackeOrder=1')
		}
	}
	render() {
		return(
			<div className="orderDetailPackage">
				{
					this.state.country?<div className="delivery-information delivery-hasaddress">
					<div>
						<span style={{paddingLeft:'1.5rem'}}>{this.state.name}{this.state.phone}</span>
						<img alt="arrow" className="arrow" src={require('../image/arrow.png')} style={{width:'2.2rem'}}/>
					</div>
					<div style={{paddingLeft:'1.5rem',paddingTop:'1rem'}}>{this.state.province}{this.state.city}{this.state.country}</div>
					<div style={{paddingLeft:'1.5rem',paddingBottom:'1rem'}}>{this.state.detailAddress}</div>
				</div>:<div className="delivery-information" onClick={this.getUserInfo}>
					<img className="add" alt="add" src={require('../image/add.png')}/>
					<span>收货信息</span>
					<img alt="arrow" className="arrow" src={require('../image/arrow.png')} style={{width:'2.2rem'}}/>
				</div>
				}
				<div className="package-detail">
					<div style={{padding:'1.5rem',display: 'flex'}}>
						<img alt="package-img" src={this.state.listPicture} className="package-img"/>
						<div className="package-content">
							<div className="title-package">{this.state.title}</div>
							{
								this.state.giftPackageDetailList.map((value, key) => {
								return (
									<div className="content" key={key}>{value.goodsDesc}*{value.goodsCount}</div>
								)
							})
							}
							
						</div>
						<div className="packae-price">
							<div>x1</div>
							<div>￥{this.state.salesPrice/100}</div>
						</div>
					</div>
				</div>
				{
					this.state.firstMobile?null:<div className="recommended-by">
					<span style={{color:'#1A2833',fontSize:'1.5rem',fontWeight:'400'}}>推荐人手机号</span><Input placeholder="请输入推荐人手机号" allowClear onChange={this.onChange} maxLength={11} type={'tel'} value={this.state.recommendedPhone}/>
				</div>
				}
				
				<div className="order-confirm">
					<div>
						<span style={{color:'#1A2833',fontSize:'1.6rem',fontWeight:'400'}}>订单金额:</span>
						<span style={{color:'#FF7B31',fontSize:'1.8rem',fontWeight:'bold'}}>￥399</span>
					</div>
					<div>
						{
							this.state.canSubmit?<button onClick={this.submit}>提交</button>:<button style={{opacity:'0.5'}}>提交</button>
						}
					</div>
				</div>
            </div>
		);
	}
}
export default OrderDetailPackage;