import Home from '../components/Home';
import News from '../components/news';
import Product from '../components/Product'
import Content from '../components/Content'
import ProductDetail from '../components/ProductDetail'
import Usermore from '../components/Usermore'
import Info from '../components/User/Info'
import Main from '../components/User/Main'
let routes = [{
	path: '/',
	component: Home,
	exact: true
},{
	path:"/product",
	component:Product,
},{
	path:"/news",
	component:News,
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