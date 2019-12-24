import React,{Component} from 'react';
import '../css/balanceWithdrawal.scss'
import { Input } from 'antd'; 
import api from '../common/api.js'
class BalanceWithdrawal extends Component{
	constructor(props){
		super(props);
		this.state = {
			freeAmount:'',
			tipsShow:false,
			tipsShowBtn:true
		}
	}
	componentDidMount() {
		this.getBalanceDetail()
	}
	getBalanceDetail(){
		api.post(api.getUrl('queryWithdrawal', '/hido-core'), {}).then(res => {
			this.setState({
				freeAmount:res.content.freeAmount
			})
		}).catch(() => { })
	}
	handle=(e)=>{
		if(parseFloat(e.target.value) > this.state.freeAmount){
			this.setState({
				tipsShow:true,
				tipsShowBtn:true,
				tipText:'金额已超过可提现金额'
			})
		}else if(parseFloat(e.target.value) > 10000){
			this.setState({
				tipsShow:true,
				tipsShowBtn:true,
				tipText:'单笔最高可提现10000.00元'
			})
		}else if(parseFloat(e.target.value) < 100 ){
			this.setState({
				tipsShow:true,
				tipsShowBtn:true,
				tipText:'单笔最低可提现100.00元'
			})
		}else{
			this.setState({
				tipsShow:false,
				tipsShowBtn:false
			})
		}
		console.log(e.target.value)
		console.log(this.state.freeAmount)
		this.setState({
			amount:e.target.value
		})
	}
	render(){
		return(
			<div className="balanceWithdrawal">
				<div className="balance-content">
					<div style={{color:'#1A2833',fontSize:'1.4rem',fontWeight:'400',padding:'2rem 0 0 1.5rem'}}>
						提现金额(元)
					</div>
					<Input  placeholder="请输入金额" allowClear onChange={this.handle} name="amount" value={this.state.amount} style={{height:'7rem'}} type='text'/>
					<div style={{width:'100%',height:'0.5px',background:'#eee',marginLeft:'1.5rem'}}></div>
					{
						this.state.tipsShow?<div style={{color:'#FF0000',padding:'1.1rem 0 1.1rem 1.5rem'}}>{this.state.tipText}</div>:<div style={{padding:'1.1rem 0 1.1rem 1.5rem'}}>可用余额{this.state.freeAmount/100}(最低提现100元)</div>
					}
					<div style={{width:'100%',height:'0.5px',background:'#eee',border:'0.5px solid #eee'}}></div>
					<div style={{padding:'1.5rem'}}>
						<img alt="order_icon" src={require('../image/add.png')} style={{width:"2.4rem"}}/>
						<span style={{color:'#8A9399',fontSize:'1.4rem',fontWeight:'400',paddingLeft:'1.8rem'}}>添加银行卡</span>
						<img src={require('../image/arrow.png')} style={{width:'2.2rem',float:'right',marginRight:'1rem'}}/>
					</div>
				</div>
				<div style={{textAlign:'center',marginTop:'30%'}}>
				{
					this.state.tipsShowBtn?<button className="confirmBtn-balance" style={{opacity:'0.5'}}>确认提现</button>:<button className="confirmBtn-balance" onClick={this.corfimWithdraw}>确认提现</button>
				}
				  
				</div>
			</div>
		)
	}
}
 export default BalanceWithdrawal;