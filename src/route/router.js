import ReferrerPhone from '../components/ReferrerPhone'
import Reservation from '../components/Reservation'
import Login from '../components/Login'
import ReservationDetail from '../components/ReservationDetail'
import PaymentList from '../components/PaymentList'
import ReservationStatus from '../components/ReservationStatus'
import WaitPaymentDetail from '../components/WaitPaymentDetail'
import OrderList from '../components/OrderList'
import OrderDetail from '../components/OrderDetail'
import ProductDetail from '../components/ProductDetail'
import OrderDetailPackage from '../components/OrderDetailPackage'
import DeliveryInformation from '../components/DeliveryInformation'
import BalanceWithdrawal from '../components/BalanceWithdrawal'
import AddBankList from '../components/AddBankList'
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
},{
	path:"/productDetail",
	component:ProductDetail
	
},{
	path:"/orderDetailPackage",
	component:OrderDetailPackage
},{
	path:"/deliveryInformation",
	component:DeliveryInformation
},{
	path:"/balanceWithdrawal",
	component:BalanceWithdrawal
},{
	path:"/addBankList",
	component:AddBankList
}]
export default routes;