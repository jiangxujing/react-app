import React,{Component} from 'react';
class ReferrerPhone extends Component{
	constructor(props){
		super(props);
		this.state = {
			tel:'',
			teltrue:false
		}
	}
	
	handleClick = ()=>{
		console.log(this.refs.tel.value)
		if(this.refs.tel.value.length === 11){
			sessionStorage.setItem('agentPhone',this.refs.tel.value)
			this.setState({
				teltrue:true
			})
		}else{
			this.setState({
				teltrue:false
			})
		}
	}
	jumpNext = () => {
		this.props.history.push('reservation?fromReferrerPhone=1')
	}
	getNext=()=>{
		this.props.history.push('reservation?fromReferrerPhone=1')
	}
	render(){
		return(
			<div>
				<h2 className="title">请输入推荐人手机号</h2>
				<input className="tel-input" type="text" maxLength='11' ref='tel' defaultValue='' onChange={this.handleClick} placeholder="请输入推荐人手机号"/>
				<div className="borerStyle"></div>
				<div className="btn">
				     {this.state.teltrue? <button className="nextBtn" onClick={this.getNext}>下一步</button>
                    :<button className="nextBtn gray">下一步</button>}
				</div>
				<div className="jumpNext" onClick={this.jumpNext}>跳过</div>
			</div>
		)
	}
}
 export default ReferrerPhone;