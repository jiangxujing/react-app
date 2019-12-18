import React,{ Component } from 'react'
class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			msg:"我是用户信息"
		}
	}
	render(){
		return (
			<div className="Main">
				我是个人中心组件
			</div>
		)
	}
}
export default Main;
