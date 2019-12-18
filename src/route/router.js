import Home from '../components/Home';
import News from '../components/news';
import Product from '../components/Product'
import Content from '../components/Content'
import ProductDetail from '../components/ProductDetail'
import Usermore from '../components/Usermore'
import Info from '../components/User/Info'
import Main from '../components/User/Main'
import ReferrerPhone from '../components/ReferrerPhone'
import ToDoList from '../components/ToDoList'
import Reservation from '../components/Reservation'
import Login from '../components/Login'
import ReservationDetail from '../components/ReservationDetail'
import PaymentList from '../components/PaymentList'
import ReservationStatus from '../components/ReservationStatus'
import WaitPaymentDetail from '../components/WaitPaymentDetail'
import OrderList from '../components/OrderList'
import OrderDetail from '../components/OrderDetail'
let routes = [{
	path: '/',
	component: ReferrerPhone,
	exact: true
},{
	path:"/toDoList",
	component:ToDoList,
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
	path:"/user-more",
	component:Usermore,
	routes:[
		{
			path:'/user-more/',
			component:Info
		},{
			path:'/user-more/info',
			component:Main
		}
	]
}]
export default routes;