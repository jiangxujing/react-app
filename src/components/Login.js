import React,{Component} from 'react';
import { Input } from 'antd'; 
import '../css/login.scss'
import api from '../common/api.js'
import {setCookie} from '../common/utils.js'
class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			btnActive:false,
			phone:'',
			smsSerialNo:'',
			smcCode:9,
			interval:{},
			secondshow:false
		}
	}
	onChange=(e)=>{
		if(e.target.value.length>=11){
			this.setState({
			btnActive:true,
			phone:e.target.value
		})
		}
	}
	onverifyCodeChange=(e)=>{
		this.setState({
			verifyCode:e.target.value
		})
	}
	getSmsCode=()=>{
		let req = {
			phone:this.state.phone,
			sourceFlag:1
		}
		let code = 9
		console.log(api.getUrl('common-sendMobileCode','/user'))
		api.post(api.getUrl('common-sendMobileCode','/user'), req).then(res => {
			this.setState({
				serialNo:res.content.serialNo,
				secondshow:true
			})
			this.state.interval = setInterval(()=>{
				this.setState({
				smcCode:code--
			})
				if(this.state.smcCode<=0){
					clearInterval(this.state.interval)
					this.setState({
						smcCode:9,
						secondshow:false
					})
				}
				console.log(code)
			},1000);
			
		}).catch(() => {})
	}
	login=()=>{
		let req = {
			phone:this.state.phone,
			verifyCode:this.state.verifyCode,
			scope:'snsapi_bas',
			smsSerialNo:this.state.serialNo,
			wechat:'XM'
		}
		api.post(api.getUrl('login-phoneLogin','/user'), req).then(res => {
			if(res.code === 0){
				setCookie('mmTicket',res.accessToken)
				clearInterval(this.state.interval)
				sessionStorage.getItem('locationurl')?window.location.href =sessionStorage.getItem('locationurl') :this.props.history.push('/referrerPhone')
			}
			
		}).catch(() => {})
	}
	render(){
		return(
			<div className="login">
				<div className="title" style={{paddingTop:'3rem'}}>您好!</div>
				<div className="title" style={{paddingBottom:'3rem'}}>欢迎来到HIDO!</div>
				<Input placeholder="请输入手机号" allowClear onChange={this.onChange} maxLength={11} type={'tel'} ref="phone"/>
				{
					this.state.secondshow?<span style={{color:'#FF7B31'}}>{this.state.smcCode}s</span>:<span onClick={this.getSmsCode} style={{color:'#FF7B31'}}>获取验证码</span>
					
				}
				<div className="border-style"></div>
				<div style={{marginTop:'2rem'}}>
					<Input placeholder="输入验证码" allowClear onChange={this.onverifyCodeChange} maxLength={11} type={'tel'} style={{width:'100%'}}/>
				</div>
				
				<div style={{textAlign:'center',marginTop:'6rem'}}>
						{
							this.state.btnActive?<button className="sendmsg-style sendmsg-active" onClick={this.login}>登录</button>:
							<button className="sendmsg-style">登录</button>
						}
				</div>
			</div>
		)
	}
}
 export default Login;