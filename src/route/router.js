import ReferrerPhone from '../components/ReferrerPhone'
import Reservation from '../components/Reservation'
import Login from '../components/Login'
import ReservationDetail from '../components/ReservationDetail'
import PaymentList from '../components/PaymentList'
import ReservationStatus from '../components/ReservationStatus'
import WaitPaymentDetail from '../components/WaitPaymentDetail'
import OrderList from '../components/OrderList'
import OrderDetail from '../components/OrderDetail'
let routes = [{
	path: '/referrerPhone',
	component: ReferrerPhone,
	exact: true
},{
	path:"/reservation",
	component:Reservation,
},{
	path:"/login",
	component:Login
},{
	path:"/reservationDetail",
	component:ReservationDetail
},{
	path:"/reservationStatus",
	component:ReservationStatus
},{
	path:"/paymentList",
	component:PaymentList
},{
	path:"/waitPaymentDetail",
	component:WaitPaymentDetail
},{
	path:"/orderDetail",
	component:OrderDetail
},{
	path:"/orderList",
	component:OrderList
}]
export default routes;