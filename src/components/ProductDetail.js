import React, { Component } from 'react';
const axios = require('axios');
class ProductDetail extends Component {
	constructor(props){
		super(props);
		this.state={
			list:[],
			domain:"http://a.itying.com/"
		}
	}
	getDetail(id){
		let api = this.state.domain+'api/productcontent?id='+id
		axios.get(api).then((res)=>{
			console.log(res.data.result[0])
			this.setState({
				list:res.data.result[0]
			})
		})
		
	}
	componentDidMount(){
		console.log(this.props.match.params.aid)
		let id = this.props.match.params.aid
		this.getDetail(id)
	}
	render(){
		return (
			<div>
				<div className="product-detail">
					<h3>{this.state.list.title}</h3>
					<img className="detail-img" src={`${this.state.domain}${this.state.list.img_url}`}/>
					<div dangerouslySetInnerHTML={{__html: this.state.list.content}}></div>
				</div>
			</div>
		)
	}
}
export default ProductDetail
