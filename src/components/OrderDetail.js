import React, {
	Component
} from 'react';
import '../css/waitPaymentDetail.scss'
import { message } from 'antd';
import api from '../common/api.js'
import {getPayType} from '../common/utils.js'
class OrderDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetai:{},
			orderItemList:[],
			deductionAmount:'',
			packageWriteoffs:[],
			totalPrice:0
		};
	}
	componentDidMount() {
		this.getwaitPaymentDetail()
	}
	getwaitPaymentDetail(){
		let req = {
			businessNo:this.props.location.search.split('?businessNo=')[1]
		}
		api.post(api.getUrl('customer-feeOrderPreview','/hido-core'), req).then(res => {
			res.content =  {
			"deductionAmount": 300,
			"meiyaOrderMemol": null,
			"meiyaOrderNo": "1575943314",
			"meiyaOrderOpenTime": "2019-12-10 10:02:07",
			"meiyaOrderWriter": "admin",
			"payTime":"2019-12-10 10:02:07",
			"payType":'WX',
			"orderItemList": [{
				"salesAmount": 600,
				"itemCount": 1,
				"itemName": "酒窝成形术1",
				"itemNo": null,
				"originalPrice": 600
			},{
				"salesAmount": 600,
				"itemCount": 1,
				"itemName": "酒窝成形术2",
				"itemNo": null,
				"originalPrice": 600
			},{
				"salesAmount": 600,
				"itemCount": 1,
				"itemName": "酒窝成形术3",
				"itemNo": null,
				"originalPrice": 600
			}],
			"packageWriteoffs": [{
				"itemName": "酒窝成形术1",
				"itemNo": null,
				"writeoffAmount": 100
			},{
				"itemName": "酒窝成形术2",
				"itemNo": null,
				"writeoffAmount": 100
			},{
				"itemName": "酒窝成形术3",
				"itemNo": null,
				"writeoffAmount": 100
			}]
		}
			this.setState({
				orderDetai:res.content,
				orderItemList:res.content.orderItemList,
				deductionAmount:res.content.deductionAmount,
				packageWriteoffs:res.content.packageWriteoffs?res.content.packageWriteoffs:[],
			})
			this.state.orderItemList.forEach((k,v)=>{
				this.setState({
					totalPrice:this.state.totalPrice+=k.salesAmount
				})
			})
			this.state.packageWriteoffs.forEach((k,v)=>{
				console.log(k.writeoffAmount)
				this.setState({
					totalPrice:this.state.totalPrice-=k.writeoffAmount
				})
			})
			
		}).catch(() => {})
	}
	render() {
		return(
			<div className="waitPaymentDetail">
				<div className="chargeItem">
					<div className="charge-title">收费项目</div>
					<div className="charge-content">
							{
								this.state.orderItemList.map((value,key)=>{
			        				return(
			        					<div className="charge-item" key={key}>
				        					<div>{value.itemName}</div>
											<div style={{textAlign:'center'}}>{value.itemCount}</div>
											<div style={{textAlign:'right'}}>
												<span>¥{value.salesAmount/100}</span>
												&nbsp;&nbsp;&nbsp;&nbsp;
												<span>¥{value.originalPrice/100}</span>
											</div>
			        					</div>
			        				)
			        			})
							}
							{
									this.state.packageWriteoffs.map((value,key)=>{
				        				return(
				        					<div className="charge-item" key={key}>
					        					<div>{value.itemName}(礼包)</div>
												<div style={{textAlign:'right',color:'#FF7B31'}}>
													<span>-¥{value.writeoffAmount/100}</span>
												</div>
				        					</div>
				        				)
				        			})
								}
							<div className="charge-item">
	        					<div>预付金抵扣</div>
								<div style={{textAlign:'right',color:'#FF7B31'}}>
									<span>-¥{this.state.deductionAmount/100}</span>
								</div>
        					</div>
					</div>
					<div className="subtotal">
						<span>小计</span>
						<span>¥{this.state.totalPrice/100}</span>
					</div>
				</div>
				<div className="chargeItem">
					<div className="charge-title">订单信息</div>
					<div className="charge-content" style={{background:'#fff',padding:0}}>
						<div className="charge-item">
							<div>开单号:</div>
							<div style={{textAlign:'right'}}>
								{this.state.orderDetai.meiyaOrderNo}
							</div>
						 </div>
						 <div className="charge-item">
							<div>开单人:</div>
							<div style={{textAlign:'right'}}>
								{this.state.orderDetai.meiyaOrderWriter}
							</div>
						 </div>
						 <div className="charge-item">
							<div>开单时间:</div>
							<div style={{textAlign:'right'}}>
								{this.state.orderDetai.meiyaOrderOpenTime}
							</div>
						 </div>
						 <div className="charge-item">
							<div>备注:</div>
							<div style={{textAlign:'right'}}>
								{this.state.orderDetai.meiyaOrderMemo}
							</div>
						 </div>
					</div>
				</div>
					<div className="chargeItem">
					<div className="charge-title">支付信息</div>
					<div className="charge-content" style={{background:'#fff',padding:0}}>
						<div className="charge-item">
							<div>支付方式:</div>
							<div style={{textAlign:'right'}}>
								{getPayType(this.state.orderDetai.payType)}
							</div>
						 </div>
						 <div className="charge-item">
							<div>支付时间:</div>
							<div style={{textAlign:'right'}}>
								{this.state.orderDetai.payTime}
							</div>
						 </div>
					</div>
				</div>
            </div>
		);
	}
}

export default OrderDetail;