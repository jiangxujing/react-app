import React, {
	Component
} from 'react';
import '../css/resercation.scss'
import { DatePicker } from 'antd';
import moment from 'moment';
import { message } from 'antd';
import api from '../common/api.js'
class Reservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: [],
			itemName: '请选择',
			projectactive: -1,
			showElem: 'none',
			showDoctorElem: 'none',
			docrtoractive: -1,
			doctorList: [],
			doctorName: '请选择',
			hourShowElem: 'none',
			hourActive: -1,
			hour: '请选择时间',
			date: '',
			couponDetail: '',
			checked: true,
			couponDetailShow: 'none',
			comfirmBOxShow: 'none',
			agentPhone:'',
			hourList: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-:13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00']
		};
	}
	componentDidMount() {
		this.getMedicineItemsTotalList()
		this.isHasParentAgent()
	}
	openAdvisoryList = (params) => {
		if(params === 1) {
			this.setState({
				showElem: 'block'
			})
		} else if(params === 2) {
			if(this.state.itemName && this.state.itemName !== '请选择') {
				this.getDoctorList()
				this.setState({
					showDoctorElem: 'block'
				})
			} else {
				message.warning('请先选择咨询项目')
			}

		} else if(params === 3) {}
	}
	selectItem = (index, params, value) => {
		if(params === 1) {
			if(index !== this.state.projectactive) {
				this.setState({
					projectactive: index,
					showElem: 'none',
					itemName: value.itemName,
					itemNo: value.itemNo
				})
			} else {
				this.setState({
					projectactive: -1,
					showElem: 'none',
					itemName: '请选择',
					itemNo: ''
				})
			}
		} else if(params === 2) {
			if(index !== this.state.docrtoractive) {
				this.setState({
					docrtoractive: index,
					showDoctorElem: 'none',
					doctorName: value.doctorName,
					doctorNo:value.doctorNo
				})
			} else {
				this.setState({
					docrtoractive: -1,
					showDoctorElem: 'none',
					doctorName: '',
					doctorNo:''
				})
			}
		}
	}
	openHour = () => {
		this.setState({
			hourShowElem: 'block'
		})
	}
	queryCoupon(params) {
		console.log(params)
		let req = {
			agentPhone: params
		}
		api.post(api.getUrl('queryCoupon','/hido-core'), req).then(res => {
			if(res.content && res.content.couponNo) {
				this.setState({
					couponDetailShow: 'block',
					couponDetail: res.content
				})
			}
		}).catch(() => {})
	}
	getDoctorList() {
		let req = {
			medicineItemNo: this.state.itemNo
		}
		api.post(api.getUrl('doctorsList','/hido-core'), req).then(res => {
			this.setState({
				doctorList: res.content
			})
		}).catch(() => {})
	}
	getMedicineItemsTotalList() {
		api.post(api.getUrl('medicineItemsList','/hido-core'), {}).then(res => {
			this.setState({
				projectList: res.content
			})
		}).catch(() => {})
	}
	checkedCoupon = () => {
		this.setState({
			checked: !this.state.checked
		})
	}
	closeConmfirmBox = () => {
		this.setState({
			comfirmBOxShow: 'none'
		})
	}
	checkEmpty = () => {
		if(this.state.itemName && this.state.doctorName && this.refs.customerName.value) {
			this.setState({
				reservationActive: true
			})
		} else {
			this.setState({
				reservationActive: false
			})
		}
	}
	onChange = (value) => {
		this.setState({
			date: moment(value._d).format('YYYY-MM-DD')
		})
	}
	selectHour = (key, value) => {
		if(key !== this.state.hourActive) {
			this.setState({
				hourActive: key,
				hourShowElem: 'none',
				hour: value
			})
		} else {
			this.setState({
				hourActive: -1,
				hourShowElem: 'none',
				hour: '请选择时间'
			})
		}
	}
	isHasParentAgent() {
		api.post(api.getUrl('isHasParentAgent','/hido-core'), {}).then(res => {
			this.refs.customerPhone.value = res.content.customerPhone
			this.agentPhone = res.content.agentPhone
			//从推荐人手机号过来的
			if(this.props.location.search) {
				if(sessionStorage.getItem('agentPhone')) {
					this.queryCoupon(sessionStorage.getItem('agentPhone'))
				}
			} else {
				this.queryCoupon(this.agentPhone)
			}
		}).catch(() => {})
	}
	getReservation = () => {
		this.setState({
			comfirmBOxShow: 'block'
		})
	}
	confrimReservation = () => {
			let frontendTime = this.state.hour.split('-')[0] + ':00'
			let time = this.state.date + ' ' + frontendTime
		let req = {
			agentPhone: sessionStorage.getItem('agentPhone') || this.agentPhone || null,
			appointmentDate: new Date(time).getTime(),
			couponCode: this.state.couponDetail.couponNo || null,
			customerName: this.refs.customerName.value,
			doctorName: this.state.doctorName,
			doctorNo: this.state.doctorNo,
			medicineItemName: this.state.itemName,
			medicineItemNo: this.state.itemNo
		}
		api.post(api.getUrl('reserveDoctor','/hido-core'), req).then(res => {
			if(res.code === '000'){
				if(this.state.couponDetailShow && this.state.checked){
					this.props.history.push('paymentList?businessNo='+res.content.businessNo+'&actualAmount='+this.state.couponDetail.payAmount)
				}else{
					this.props.history.push('reservationStatus?businessNo='+res.content.businessNo)
				}
			}else{
				message.warning(res.desc)
			}
		}).catch(() => {})
	}
	render() {
		return(
			<div className="reservation">
               	 <div>
               	 	<div className="reservation-title">预约信息</div>
               	 	<div className="list-style" onClick={this.openAdvisoryList.bind(this,1)}>
               	 		<span>咨询项目</span>
               	 		<span style={{paddingLeft:"30px"}}>{this.state.itemName}</span>
               	 		<img alt="arrow" src={require('../image/arrow.png')} style={{width:"22px",float:"right"}}/>
               	 	</div>
               	 	<div className="list-style" onClick={this.openAdvisoryList.bind(this,2)}>
               	 		<span>医师</span>
               	 		<span style={{paddingLeft:"30px"}}>{this.state.doctorName}</span>
               	 		<img alt="arrow" src={require('../image/arrow.png')} style={{width:"22px",float:"right"}}/>
               	 	</div>
               	 	<div className="list-style" onClick={this.openAdvisoryList.bind(this,3)}>
               	 		<span>面诊时间</span>
						<DatePicker style={{paddingLeft:"20px",width:"45%"}} onChange={this.onChange} allowClear/>
						<span onClick={this.openHour} style={{paddingLeft:"10px"}}>{this.state.hour}</span>
						<ul className="hour-list" style={{display:this.state.hourShowElem}}>
							{
								this.state.hourList.map((value,key)=>{
									return(
										<li key={key} onClick={this.selectHour.bind(this,key,value)} className={this.state.hourActive === key?'activehour':''}>{value}</li>
									)
								})
							}
							<li></li>
						</ul>
               	 		<img alt="arrow" src={require('../image/arrow.png')} style={{width:"22px",float:"right"}}/>
               	 	</div>
               	 </div>
               	  <div>
               	 	<div className="reservation-title">就诊人信息</div>
               	 	<div className="list-style">
               	 		<span>姓名</span>
               	 		<input className="input-style" type="text" placeholder="请输入姓名" onInput={this.checkEmpty} ref="customerName" />
               	 	</div>
               	 	<div className="list-style">
               	 		<span>手机号</span>
               	 		<input className="input-style" type="tel" placeholder="请输入手机号" ref="customerPhone" readOnly/>
               	 	</div>
               	 </div>
               	 <div className="coupon" onClick={this.checkedCoupon} style={{display:this.state.couponDetailShow}}>
               	 	<span>预付{this.state.couponDetail.payAmount/100}元<span style={{fontSize:"2.2rem",fontWeight:"600"}}>抵扣{this.state.couponDetail.deductionAmount/100}元</span></span>
               	 	{this.state.checked?<img alt="radio-checked" src={require('../image/radio-checked.png')} style={{width:"1.5rem",float:"right",marginTop:"1.8rem",marginRight:"1.5rem"}}/>:<img alt="radio-no" src={require('../image/radio-no.png')} style={{width:"1.5rem",float:"right",marginTop:"1.8rem",marginRight:"1.5rem"}}/>}
               	 </div>
               	 {this.state.reservationActive?<div className="reservationBtn active-reservation" onClick={this.getReservation}>预约</div>
                    :<div className="reservationBtn">预约</div>}
               	 <div className="project-list-wrapper" style={{display:this.state.showElem}}>
               	 {
        			this.state.projectList.map((value,key)=>{
        				return(
        					<div className="project-item" key={key} onClick={this.selectItem.bind(this,key,1,value)}>
        						<div style={{float:"left"}}>{value.itemName}</div>
        						 {this.state.projectactive === key?<img alt="gouxuan" src={require('../image/gouxuan@2x.png')} style={{width:"22px",float:"right",marginRight:"30px",marginTop:"10px"}}/>
               					 :null}
        					</div>
        				)
        			})
            		}
               	 </div>
               	 <div className="doctor-list-wrapper" style={{display:this.state.showDoctorElem}}>
               	 	{
               	 		this.state.doctorList.map((value,key)=>{
               	 			return(
               	 				<div className="project-item"  key={key} onClick={this.selectItem.bind(this,key,2,value)}>
            						<div style={{float:"left"}}>{value.doctorName}</div>
            						 {this.state.docrtoractive === key?<img alt="gouxuan" src={require('../image/gouxuan@2x.png')} style={{width:"22px",float:"right",marginRight:"30px",marginTop:"10px"}}/>
                   					 :null}
            					</div>
               	 			)
               	 		})
               	 	}
               	 </div>
               	 <div className="confirm-wrapper" onClick={this.closeConmfirmBox} style={{display:this.state.comfirmBOxShow}}>
               	 	<div className="confirm-content">
               	 		<div className="confirm-title">确认预约</div>
               	 		<div className="project-list">
               	 			<span className="project-title">我的项目:</span>
               	 			<span className="project-content">{this.state.itemName}</span>
               	 		</div>
               	 		<div className="project-list">
               	 			<span className="project-title">预约医师:</span>
               	 			<span className="project-content">{this.state.doctorName}</span>
               	 		</div>
               	 		<div className="project-list">
               	 			<span className="project-title">预约时间:</span>
               	 			<span className="project-content">{this.state.date} {this.state.hour}</span>
               	 		</div>
               	 		<div className="project-list" style={{display:this.state.couponDetailShow && this.state.checked===false?'none':'block'}}>
               	 			<span className="project-title">预付金:</span>
               	 			<span className="project-content">{this.state.couponDetail.payAmount/100}元</span><span style={{color:'#FF7B31',fontSize:'1.2rem'}}>(实际抵扣{this.state.couponDetail.deductionAmount/100}元)</span>
               	 		</div>
               	 		<div className="borderStyle"></div>
               	 		<div className="confirmBtn" onClick={this.confrimReservation}>确认预约</div>
               	 	</div>
               	 </div>
            </div>
		);
	}
}

export default Reservation;