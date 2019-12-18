import React ,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Product extends Component {
	constructor(props){
		super(props)
		this.state ={
			list:[
				{
					aid:'11',
					title:'我是商品111'
				},{
					aid:'22',
					title:'我是商品222'
				},{
					aid:'33',
					title:'我是商品333'
				},{
					aid:'44',
					title:'我是商品444'
				},{
					aid:'55',
					title:'我是商品555'
				}
			]
		}
	}
	render(){
		return (
			<div>
				<ul>
					{
					this.state.list.map((value,key)=>{
						return (
							<li key={key}>
								<Link to={`/productDetail/?aid=${value.aid}`}>{value.title}</Link>
							</li>
							)
					})
				}
				</ul>
			</div>
		)
	}
}
export default Product;
