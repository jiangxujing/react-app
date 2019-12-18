import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/index.css'
import routes from './route/router.js'
class App extends Component {
  render() {
    return (
        <Router>
          <div className="content">           
              <header className="title">
                <Link to="/">首页</Link>
                <Link to="/news">新闻</Link>
                <Link to="/product">商品</Link>
                <Link to="/user-more">用户页面2</Link>
              </header>
 {
              routes.map((route,key)=>{
                  if(route.exact){
                    return <Route key={key} exact path={route.path}                     
                    render={props => (
                      <route.component {...props} routes={route.routes} />
                    )}

                    />
                  }else{
                    return <Route  key={key}  path={route.path} 
                    render={props => (
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
