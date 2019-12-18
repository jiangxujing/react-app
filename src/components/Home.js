import React, {
	Component
} from 'react';
import { Link } from "react-router-dom";
const axios = require('axios');

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			domain: "http://a.itying.com/"
		};
	}
	getData = () => {
		var api = this.state.domain + 'api/productlist'
		axios.get(api).then((res) => {
			console.log(res.data)
			this.setState({
				list: res.data.result
			})
		})
	}
	componentDidMount() {
		this.getData()
	}
	render() {
		return(
			<div>
            	<div className="product-detail">
            		{
            			this.state.list.map((value,key)=>{
            				return(
            					<div key={key}>
            						<h3>{value.title}</h3>
			            		<ul>
			            			{
			            				value.list.map((v,k)=>{
			            					return (
			            						<li key={k}>
			            						    <Link to={`/productDetail/${v._id}`}>
			            						    	<img className="detail-img" src={`${this.state.domain}${v.img_url}`}/>
							            				<div>{v.title}</div>
							            				<div>{v.price}元</div>
			            						    </Link>
						            			</li>
			            					)
			            				})		
			            			}
			            		</ul>
            					</div>
            				)
            			})
            		}
            	</div>
            </div>
		);
	}
}

export default Home;