import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/index.css'
import Home from './components/Home';
import News from './components/news';
import Product from './components/Product'
import Content from './components/Content'
import ProductDetail from './components/ProductDetail'
import User from './components/User'
import Usermore from './components/Usermore'
class App extends Component {
  render() {
    return (
        <Router>
          <div className="content">           
              <header className="title">
                <Link to="/">首页</Link>
                <Link to="/news">新闻</Link>
                <Link to="/product">商品</Link>
                <Link to="/user">用户页面</Link>
                <Link to="/user-more">用户页面2</Link>
              </header>
//            <Route exact path="/" component={Home} />
//            <Route path="/news" component={News} />   
//             <Route path="/product" component={Product} />  
//             <Route path="/content/:aid" component={Content}/>
//             <Route path="/productDetail/:aid" component={ProductDetail}/>
//       			<Route path="/user" component={User}/>
//       			<Route path="/user-more" component={Usermore}/>
 {
              routes.map((route,key)=>{

                  if(route.exact){

                    return <Route key={key} exact path={route.path}                     

                    // route.component     value.component   <User  {...props}  routes={route.routes} />

                    render={props => (
                      // pass the sub-routes down to keep nesting
                      <route.component {...props} routes={route.routes} />
                    )}

                    />
                  }else{
                    return <Route  key={key}  path={route.path} 
                    render={props => (
                      // pass the sub-routes down to keep nesting
                      <route.component {...props} routes={route.routes} />
                    )}
                    />

                  }
              })
            }      
         </div>
      </Router>
    );
  }
}

export default App;
