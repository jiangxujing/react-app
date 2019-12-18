import React, {
	Component
} from 'react';
import '../css/orderList.scss'
import { message } from 'antd';
import api from '../common/api.js'
import {dateFormatter} from '../common/utils.js'
class OrderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderList:[]
		};
	}
	componentDidMount() {
		this.getOrderList()
	}
	getOrderList(){
		api.post(api.getUrl('customer-orderList','/hido-core'), {}).then(res => {
			res.content =  [{
			"amount": 2400000,
			"businessNo": "PAY20191206154943523102",
			"createTime": 1575618584000,
			"title": "项目收费",
			"type": "PAY"
		},{
			"amount": 2400000,
			"businessNo": "PAY20191206154943523102",
			"createTime": 1575618584000,
			"title": "项目收费",
			"type": "PAY"
		},{
			"amount": 2400000,
			"businessNo": "PAY20191206154943523102",
			"createTime": 1575618584000,
			"title": "项目收费",
			"type": "PAY"
		}]
			if(res.code == '000'){
				this.setState({
					orderList:res.content
				})
			}
		}).catch(() => {})
	}
	getOederDetail=(value)=>{
			this.props.history.push('orderDetail?businessNo='+value.businessNo)
	}
	render() {
		return(
			<div className="orderList">
				{
					this.state.orderList.map((value,key)=>{
        				return(
        					<div style={{background:'#fff',marginTop:'1rem'}} key={key} onClick={this.getOederDetail.bind(this,value)}>
								<div className="order-time">
									{dateFormatter(value.createTime,'yyyy/MM/dd EE',1)}
								</div>
								<div style={{padding:'1.5rem 0.5rem 1.5rem 1.5rem',display: 'table'}}>
										<img className="order-left" src={require('../image/order_icon.png')} style={{width:"5.2rem"}}/>
										<div className="order-center">
											<div>{value.title}</div>
											<div>￥{value.amount/100}</div>
										</div>
										<img className="order-right" src={require('../image/arrow.png')} style={{width:'2.2rem'}}/>
								</div>
							</div>
        				)
        			})
				}
            </div>
		);
	}
}

export default OrderList;