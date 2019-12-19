import React, {
	Component
} from 'react';
import '../css/reservationStatus.scss'
import api from '../common/api.js'
import utils from '../common/utils.js'
class ReservationStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tel: '',
			teltrue: false,
			reserveDetail:{}
		}
	}
	componentDidMount() {
		this.getReserveDetail()
	}
	getReserveDetail(){
		let req = {
			businessNo:this.props.location.search.split('?businessNo=')[1]
		}
		api.post(api.getUrl('customer-reserveDetail','/hido-core'), req).then(res => {
			if(res.code === 0){
				this.setState({
					reserveDetail:res.content
				})
			}
		}).catch(() => {})
	}
	render() {
		return(
			<div className="reservationDetail">
				<div style={{background:'#fff'}}>
					<div className="product-list">
					<span>预约项目</span>
					<span style={{paddingLeft:'3rem'}}>{this.state.reserveDetail.medicineItemName}</span>
				</div>
				<div className="product-list">
					<span>医师&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<span style={{paddingLeft:'3rem'}}>{this.state.reserveDetail.doctorName}</span>
				</div>
				<div className="product-list">
					<span>面诊时间</span>
					<span style={{paddingLeft:'3rem'}}>{utils.dateFormatter(this.state.reserveDetail.appointmentDate,'yyyy-MM-dd HH:mm:ss')}</span>
				</div>
				<div className="product-list" style={{display:this.state.payAmount?'block':'none',color:'#FF7B31'}}>
					<span>预付金</span>
					<span style={{paddingLeft:'3rem'}}>预付{this.state.reserveDetail.payAmount}抵扣{this.state.reserveDetail.deductionAmount}元</span>
				</div>
				</div>
				<div style={{marginTop:'1.1rem',background:'#fff',paddingLeft:'1.5rem'}}>
					<div style={{height:'5rem',lineHeight:'6rem',borderBottom:'1px solid #eee'}}>订单信息</div>
					<div style={{paddingTop:'1.7rem'}}>
						<span>订单编号:</span>
						<span style={{float:'right',paddingRight:'1.5rem'}}>{this.state.reserveDetail.businessNo}</span>
					</div>
					<div style={{paddingTop:'1.4rem',paddingBottom:'1.8rem'}}>
						<span>下单时间:</span>
						<span style={{float:'right',paddingRight:'1.5rem'}}>{utils.dateFormatter(this.state.reserveDetail.createTime,'yyyy-MM-dd HH:mm:ss')}</span>
					</div>
				</div>
			</div>
		)
	}
}
export default ReservationStatus;