import React, {
	Component
} from 'react';
import '../css/orderList.scss'
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
			if(res.code === 0){
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
										<img alt="order_icon" className="order-left" src={require('../image/order_icon.png')} style={{width:"5.2rem"}}/>
										<div className="order-center">
											<div>{value.title}</div>
											<div>￥{value.amount/100}</div>
										</div>
										<img alt='arrow' className="order-right" src={require('../image/arrow.png')} style={{width:'2.2rem'}}/>
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