import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Info from './User/Info';
import Main from './User/Main'
class User extends Component {
		constructor(props){
			super(props);
			this.state = {
				msg:'我是一个user组件'
			};
		}
		render(){
			return(
				<div className="user">
					<div className="menu-left">
						<div>
							<Link to="/user/">我的</Link>
						</div>
						<div>
							<Link to="/user/info">账户中心</Link>
						</div>
					</div>
					<div className="menu-right">
						<Route exact path="/user/" component={Main}/>
						<Route path="/user/info" component={Info}/>
					</div>
				</div>
			)
		}
	
}
export default User
