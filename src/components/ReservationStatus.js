import React, {
	Component
} from 'react';
import '../css/reservationStatus.scss'
import {getQueryString} from '../common/utils.js'
class ReservationStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromOrder:getQueryString('fromOrder')
		};
	}
	componentDidMount() {
		
	}
	openReservationDetail=()=>{
		this.props.history.push('reservationDetail?businessNo='+this.props.location.search.split('?businessNo=')[1])
	}
	openOrderDetail=()=>{
		this.props.history.push('orderDetail?businessNo='+this.props.location.search.split('?businessNo=')[1]+'&fromOrder=1')
	}
	render() {
		return(
			<div className="reservationStatus">
				{
					this.state.fromOrder?<div>
					<img alt="success" src={require('../image/order-success.png')} style={{width:"6.6rem",paddingTop:'10rem'}}/>
					<div style={{fontSize:'1.8rem',color:'#1A2833',fontWeight:'600',marginTop:'3rem'}}>支付成功</div>
	            	<div className="reservationStatusBtn" onClick={this.openOrderDetail}>查看详情</div>
				</div>:<div>
					<img alt="order-success" src={require('../image/order-success.png')} style={{width:"6.6rem",paddingTop:'10rem'}}/>
					<div style={{fontSize:'1.8rem',color:'#1A2833',fontWeight:'600',marginTop:'3rem'}}>预约成功</div>
					<div style={{color:'#1A2833',fontSize:'1.6rem',paddingTop:'1.2rem'}}>请按时前往医院就诊哦</div>
	            	<div className="reservationStatusBtn" onClick={this.openReservationDetail}>查看预约详情</div>
				</div>
				}
				
            </div>
		);
	}
}

export default ReservationStatus;