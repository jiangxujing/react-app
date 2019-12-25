import React, {
	Component
} from 'react';
import { Input ,Drawer } from 'antd'; 
import '../css/common.scss'
import '../css/deliveryInformation.scss'
import api from '../common/api.js'
import { message } from 'antd';
class DeliveryInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			provinceList:[],
			cityList:[],
			countryList:[],
			currentIndexProvince:-1,
			currentIndexCity:-1,
			currentIndexCountry:-1,
			province:'',
			city:'',
			country:'',
			gray:true,
			name:'',
			phone:'',
			detailAddress:'',
			visible:false
		};
	}
	componentDidMount() {
		this.getAddress()
	}
	showDrawer = () => {
	    this.setState({
	      visible: true,
	    })
  }
  onClose = () => {
    this.setState({
      visible: false,
    })
  }
  getAddress(){
		api.post(api.getUrl('queryAdminRegion', '/collections-web'), {}).then(res => {
			this.setState({
				provinceList:res.content
			})
		}).catch(() => { })
  }
  selectProvince=(value,key)=>{
			this.state.provinceList.forEach((k,v)=>{
				if(value.provinceId === k.provinceId){
					this.setState({
						cityList:k.cities,
						currentIndexProvince:key,
						currentIndexCountry:-1,
						currentIndexCity:-1,
						province:k.provinceName
					})
				}
				
			})
  }
  selectCity=(value,key)=>{
  	this.state.cityList.forEach((k,v)=>{
				if(value.cityId === k.cityId){
					this.setState({
						countryList:k.counties,
						currentIndexCity:key,
						currentIndexCountry:-1,
						city:k.cityName
					})
				}
			})
  }
  selectCountry=(value,key)=>{
  	this.state.countryList.forEach((k,v)=>{
				if(value.countyId === k.countyId){
					this.setState({
						currentIndexCountry:key,
						visible:false,
						country:k.countyName
					})
					sessionStorage.setItem('country',k.countyName)
				if(this.state.name && this.state.phone && this.state.detailAddress && k.countyName){
			  		this.setState({
			  			gray:false
			  		})
			  	}else{
			  		this.setState({
			  			gray:true
			  		})
			  	}
				}
			})
  	sessionStorage.setItem('province',this.state.province)
  	sessionStorage.setItem('city',this.state.city)
  	
  }
  handle=(e)=>{
  	 let  inputValue = e.target.value,
          inputName = e.target.name
          console.log(e.target.name)
     this.setState({
          [inputName]:inputValue
     })
     setTimeout(()=>{
     	  if(this.state.name && this.state.phone && this.state.detailAddress && this.state.country){
	  		this.setState({
	  			gray:false
	  		})
	  	}else{
	  		this.setState({
	  			gray:true
	  		})
	  	}
  	sessionStorage.setItem('name',this.state.name)
    sessionStorage.setItem('phone',this.state.phone)
    sessionStorage.setItem('detailAddress',this.state.detailAddress)
     },100)
  }
  saveAddress=()=>{
  	let saveShow = true
		var regu = /^[a-zA-Z\u4e00-\u9fa5]{2,15}$/;
		var re = new RegExp(regu);
		if(this.state.name.search(re) < 0) {
			message.warning('请输入2位以上中英文姓名')
			saveShow = false
		} 
		const  mobileReg  =  /^(1)+\d{10}$/
		if(!mobileReg.test(this.state.phone)) {
			message.warning('请输入11位有效手机号')
			saveShow = false
		}
		if(!this.state.detailAddress.match(/^[\u4E00-\u9FA5a-zA-Z0-9_]{2,30}$/)) {
			message.warning('请输入准确地址信息')
			saveShow = false
		}
		if(saveShow === true){
			this.props.history.push('orderDetailPackage')
		}
  }
	render() {
		 let { name, phone,detailAddress } = this.state;
		return(
			<div className="deliveryInformation">
				<div style={{height:'4.2rem',lineHeight:'4.2rem',paddingLeft:'0.5rem',color:'#8A9399',fontSize:'1.2rem'}}>
					请填写您的信息
				</div>
				<div className="information">
					 <div>
					 	<span>收货人姓名</span>
					 	<Input placeholder="请输入姓名" allowClear name="name" value={name} onChange={this.handle} type='{text}' />
					 </div>
					  <div style={{height: '6rem',lineHeight: '6rem'}}>
					 	<span>手机号</span>
					 	<Input placeholder="请输入推荐人手机号" allowClear  name="phone" onChange={this.handle} maxLength={11} type='{tel}' value={phone}/>
					 </div>
				</div>
				<div style={{height:'4.2rem',lineHeight:'4.2rem',paddingLeft:'0.5rem',color:'#8A9399',fontSize:'1.2rem'}}>
					选择所在地区
				</div>
				<div className="address">
					<div className="information">
						 <div onClick={this.showDrawer}>
						 	<span>地区</span>
						 	<span style={{display:this.state.country?'inline':'none',paddingLeft:'3rem'}}>{this.state.province}/{this.state.city}/{this.state.country}</span>
							<img alt="arrowbank" src={require('../image/arrowbank.png')} style={{width:'2.2rem',float:'right',paddingTop:'1.5rem'}}/>
						</div>
						<div className="detail-adrees">
							<Input  placeholder="详细地址：如道路；门牌号；小区等" allowClear onChange={this.handle} name="detailAddress" value={detailAddress} style={{lineHeight:'6rem'}}  type='text'/>
						</div>
					</div>
				</div>
		        <Drawer
		          title="省市区"
		          placement="bottom"
		          closable={false}
		          onClose={this.onClose}
		          visible={this.state.visible}
		          getContainer={false}
		          style={{ position: 'absolute' }}
		        >
		      	  <ul className="address-list">
	        		{
						this.state.provinceList.map((value, key) => {
							return (
							<li key={key} onClick={this.selectProvince.bind(this,value,key)} className={key===this.state.currentIndexProvince?"active":null}>
				        		{value.provinceName}
				        	</li>
							)
						})
					}
		        </ul>
		        <ul className="address-list">
	        		{
						this.state.cityList.map((v, k) => {
							return (
							<li key={k} onClick={this.selectCity.bind(this,v,k)} className={k===this.state.currentIndexCity?"active":null}>
				        		{v.cityName}
				        	</li>
							)
						})
					}
		        </ul>
		         <ul className="address-list">
	        		{
						this.state.countryList.map((v, k) => {
							return (
							<li key={k} onClick={this.selectCountry.bind(this,v,k)} className={k===this.state.currentIndexCountry?"active":null}>
				        		{v.countyName}
				        	</li>
							)
						})
					}
		        </ul>
		        </Drawer>
		        {
		        	this.state.gray?<div className="save-btn" style={{opacity:'0.5'}}>保存</div>:<div className="save-btn" onClick={this.saveAddress}>保存</div>
		        }
		       
            </div>
		);
	}
}
export default DeliveryInformation;