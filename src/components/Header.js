import React,{Component} from 'react'
class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			title:'这是一个头部组件',
		}
	}
	getNews=()=>{
		alert(this.props.news.state.title)
		this.props.news.getData()
	}

	render(){
		return (
			<div>
				<h2>{this.props.title}</h2>
				<button onClick={this.props.run}>调用todoList父组件的run方法</button>
				<br/>
				<br/>
				<button onClick={this.props.news.getData}>获取todolist的getData方法</button>
				<br/>
				<br/>
				<button onClick={this.getNews}>获取整个news组件实例</button>
				<br/>
				<br/>
				<button onClick={this.props.news.getChildData.bind(this,'我是子组件header的数据')}>子组件给父组件传值</button>
			</div>
		)
	}
}
 export default Header;