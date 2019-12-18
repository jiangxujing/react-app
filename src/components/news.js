import React, {
	Component
} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import 'antd/dist/antd.css'; 
import { DatePicker } from 'antd';
class news extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [{
				aid: '11',
				title: '我是新闻1111'
			}, {
				aid: '22',
				title: '我是新闻2222'
			}, {
				aid: '33',
				title: '我是新闻3333'
			}, {
				aid: '55',
				title: '我是新闻5555'
			}, {
				aid: '66',
				title: '我是新闻6666'
			}]
		};
	}
	render() {
		return(   
			<div>
               	 我是news组件
               	   <DatePicker onChange={this.getDate} />
               	 <ul>
               	 	{
               	 		this.state.list.map((value,key)=>{
               	 			return (
               	 				<li key={key}>
               	 					<Link to={`/content/${value.aid}`}>
               	 						{value.title}
               	 					</Link>
               	 				</li>
               	 			)
               	 		})
               	 	}
               	 </ul>
            </div>
		);
	}
}

export default news;