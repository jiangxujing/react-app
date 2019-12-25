import React, {
	Component
} from 'react';
import '../css/addBankList.scss'
import { Input ,Drawer } from 'antd'; 
import api from '../common/api.js'
class AddBankList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acitve:false,
			bankNo:'',
			branchNo:'',
			name:'',
			IDcard:'',
			tel:'',
			smsCode:'',
			bankList:[],
			visible:false
		};
	}
	componentDidMount() {
		this.getBankList()
	}
	getBankList(){
		api.post(api.getUrl('agent-queryBankLimit', '/hido-core'), {}).then(res => {
			if(res.code === 0){
				this.setState({
					bankList:res.content
				})
			}
		}).catch(() => { })
	}
	submit=()=>{
		let req = {
			bankName:this.state.branchName,
			bankBranch:this.state.branchNo,
			cardNo:this.state.bankNo,
			idNo:this.state.IDcard,
			name:this.state.name,
			phone:this.state.tel,
			serialNo:this.state.serialNo,
			verifyCode:this.state.smsCode
		}
		api.post(api.getUrl('bankCard-v3-bindBankCard', '/user'), req).then(res => {
			if(res.code === 0){
				this.props.history.push('balanceWithdrawal')
			}
		}).catch(() => { })
	}
	handle = (e) => {
		let inputValue = e.target.value,
			inputName = e.target.name
		this.setState({
			[inputName]: inputValue
		})
		setTimeout(() => {
			if(this.state.bankNo && this.state.branchNo && this.state.name && this.state.IDcard && this.state.tel && this.state.smsCode && this.state.radioChecked) {
				this.setState({
					acitve: true
				})
			} else {
				this.setState({
					gray: false
				})
			}
		}, 100)
	}
	checkRdio=()=>{
		this.setState({
			radioChecked:!this.state.radioChecked
		})
		setTimeout(()=>{
			if(this.state.bankNo && this.state.branchNo && this.state.name && this.state.IDcard && this.state.tel && this.state.smsCode && this.state.radioChecked) {
				this.setState({
					acitve: true
				})
			} else {
				this.setState({
					gray: false
				})
			}
		},100)
	}
	getCmsCode=()=>{
		let req = {
			bankName:this.state.bankName,
			bankBranch:this.state.branchNo,
			cardNo:this.state.bankNo,
			idNo:this.state.IDcard,
			name:this.state.name,
			phone:this.state.tel
		}
		api.post(api.getUrl('bankCard-v3-getVerifyCode', '/user'), req).then(res => {
			let content = res.content
			console.log(content)
			console.log(content.serialNo)
			if(res.code === 0){
				this.setState({
					serialNo:res.content.serialNo
				})
			}else if(res.code !== 0){
				this.setState({
					acitve:false
				})
			}
		}).catch(() => { })
	}
	selectBank=()=>{
		this.setState({
			visible:true
		})
	}
	selectBankName=(item,value)=>{
		this.setState({
			selectAcitiveIndex:item,
			visible:false,
			branchName:value.bankName
		})
		setTimeout(()=>{
			console.log(item)
		},100)
	}
	onClose=()=>{
		this.setState({
			visible:false
		})
	}
	render() {
		return(
			<div className="addBankList">
				<div style={{width:'100%',background:'#fff'}}>
					<div className="bankCardList" onClick={this.selectBank}>
						<span style={{paddingLeft:'1.5rem',color:'#1A2833',fontSize:'1.4rem',fontWeight:'400',width:'8.5rem',display:'inline-block'}}>开户行</span>
						<span style={{paddingLeft:'1.5rem'}}>{this.state.branchName}</span>
						<img alt="arrow" src={require('../image/arrow.png')} style={{width:'2.2rem',float:'right',marginRight:'1rem',marginTop:'2rem'}}/>
					</div>
					<div className="bank-list">
						<span className="bank-title">银行卡号</span>
						<Input  placeholder="请输入银行卡号" allowClear onChange={this.handle} name="bankNo" value={this.state.bankNo} type='number'/>
					</div>
					<div className="bank-list">
						<span className="bank-title">开户支行</span>
						<Input  placeholder="请输入开户支行" allowClear onChange={this.handle} name="branchNo" value={this.state.branchNo} type='text'/>
					</div>
					<div className="bank-list">
						<span className="bank-title">本人姓名</span>
						<Input  placeholder="请输入本人姓名" allowClear onChange={this.handle} name="name" value={this.state.name} type='text'/>
					</div>
					<div className="bank-list">
						<span className="bank-title">身份证号</span>
						<Input  placeholder="请输入身份证号" allowClear onChange={this.handle} name="IDcard" value={this.state.IDcard} type='number'/>
					</div>
					<div className="bank-list">
						<span className="bank-title">预留手机号</span>
						<Input  placeholder="请输入银行预留手机号" allowClear onChange={this.handle} name="tel" value={this.state.tel} type='number'/>
					</div>
					<div className="bank-list">
						<span className="bank-title">验证码</span>
						<Input  placeholder="请输入验证码" allowClear onChange={this.handle} name="smsCode" value={this.state.smsCode} type='number'/>
						<button className="send-msg" onClick={this.getCmsCode}>获取验证码</button>
					</div>
				</div>
				<div className="protocol">
					{
						this.state.radioChecked?<img alt="radio" src={require('../image/radio-checked.png')} style={{width:'1.6rem',marginRight:'1rem'}} onClick={this.checkRdio}/>:<img alt="radio" src={require('../image/radio-no.png')} style={{width:'1.6rem',marginRight:'1rem'}} onClick={this.checkRdio}/>
					}
					<span>点击提交即表示我已阅读并同意<a style={{color:'#FF7B31',textDecoration:'underline'}}>《银行卡快捷支付协议》</a></span>
				</div>
				<div style={{textAlign:'center'}}>
					{
						this.state.acitve?<button className="submit-btn" onClick={this.submit}>提交</button>:<button className="submit-btn" style={{opacity:'0.5'}}>提交</button>
					}
				</div>
				   <Drawer
		          title=""
		          placement="bottom"
		          closable={false}
		          onClose={this.onClose}
		          visible={this.state.visible}
		          getContainer={false}
		          style={{ position: 'absolute' }}
		        >
		      	  <ul className="address-list">
	        		{
						this.state.bankList.map((value, key) => {
							return (
								<li key={key} onClick={this.selectBankName.bind(this,key,value)}>
									<img className="bankPhoto" src={value.bankPhoto}/>
									<span>{value.bankName}</span>
									{
										this.state.selectAcitiveIndex===key?<img alt="arrow" src={require('../image/gouxuan@2x.png')} style={{width:'2.2rem',float:'right',marginRight:'1rem',marginTop:'2rem'}}/>:null
									}
								</li>
							)
						})
					}
		        </ul>
		        </Drawer>
            </div>
		);
	}
}

export default AddBankList;