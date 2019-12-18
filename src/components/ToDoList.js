import React from 'react';
import Header from './Header';
import Footer from './Footer';
class ToDoList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName:'',
			list:[],
			title:'todolist组件',
			footer:'这是一个底部组件',
			msg:''
		}
	}
	addData=()=>{
		//console.log(this.refs.username.value)
		let list1 = this.state.list
		list1.push({
			title:this.refs.username.value,
			checked:false
		})
		this.setState({
			list:list1
		})
		this.refs.username.value = ''
		console.log(list1)
		localStorage.setItem('list',JSON.stringify(list1))
	}
	deleteFun=(key)=>{
		let list2 = this.state.list
		list2.splice(key, 1);
		this.setState({
			list:list2
		})
	}
	changeCheck=(key)=>{
		let list = this.state.list
		list[key].checked = !list[key].checked
		this.setState({
			list:list
		})
	}
	componentDidMount(){
		console.log('执行没有')
		let list = JSON.parse(localStorage.getItem('list'))
		if(list){
			this.setState({
			list:list
			
		})
		}
	}
	run=()=>{
		alert('我是父组件的run方法')
	}
	getData=()=>{
		alert(this.state.title)
	}
	getChildData=(result)=>{
		alert(result)
		this.setState({
			msg:result
		})
	}
	getFooter=()=>{
		console.log(this.refs.footer)
		this.refs.footer.run()
	}
	render(){
		return (
			<div>
				<Header title={this.state.title} run={this.run} news={this}/>
				<Footer title={this.state.footer} ref='footer'/>
				<button onClick={this.getFooter}>获取整个底部组件</button>
				<div>{this.state.msg}</div>
				<input type="text" ref="username"/>
				<button onClick={this.addData}>+增加</button>
				<br/>
				<hr/>
				<br/>
				<h2>进行中</h2>
				<div>
					{
							this.state.list.map((value,key)=>{
							if(value.checked === false){
								return (
							
								<div key={key} >{value.title} <input type="checkbox" checked={value.checked} onChange={this.changeCheck.bind(this,key)}/><button onClick={this.deleteFun.bind(this,key)}>删除</button></div>
							)
							}
						})
					}
				</div>
				<hr/>
				<h2>已完成</h2>
				<div>
					{
							this.state.list.map((value,key)=>{
							if(value.checked === true){
								return (
									<div key={key}>{value.title}<input type="checkbox" checked={value.checked} onChange={this.changeCheck.bind(this,key)}/><button onClick={this.deleteFun.bind(this,key)}>删除</button></div>
								)
							}
						})
					}
				</div>
			</div>
			
		)
	}
}
export default ToDoList;
