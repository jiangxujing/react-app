import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Usermore extends Component {
	constructor(props){
		super(props);
		this.state = {
			msg:'我是一个user组件'
		}
	}
	componentWillMount(){
		console.log(this.props.routes)
	}
	render(){
		return (
			<div className="user">
					<div className="menu-left">
					<div>
							<Link to="/user-more/">我的</Link>
						</div>
						<div>
							<Link to="/user-more/info">账户中心</Link>
						</div>
					</div>
					<div className="menu-right">
					
                            {

                                this.props.routes.map((route,key)=>{

                                     return   <Route key={key} exact path={route.path} component={route.component} />
                                })
                            }

					</div>
				</div>
		)
	}
}
export default Usermore
