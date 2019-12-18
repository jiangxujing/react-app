import React, {
	Component
} from 'react';
import '../css/reservationStatus.scss'
import { message } from 'antd';
import api from '../common/api.js'
class ReservationStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
		
	}
	openReservationDetail=()=>{
		this.props.history.push('reservationDetail?businessNo='+this.props.location.search.split('?businessNo=')[1])
	}
	render() {
		return(
			<div className="reservationStatus">
				<img src={require('../image/order-success.png')} style={{width:"6.6rem",paddingTop:'10rem'}}/>
				<div style={{fontSize:'1.8rem',color:'#1A2833',fontWeight:'600',marginTop:'3rem'}}>预约成功</div>
				<div style={{color:'#1A2833',fontSize:'1.6rem',paddingTop:'1.2rem'}}>请按时前往医院就诊哦</div>
            	<div className="reservationStatusBtn" onClick={this.openReservationDetail}>查看预约详情</div>
            </div>
		);
	}
}

export default ReservationStatus;