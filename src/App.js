import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { resetFontSize } from './common/api.js'
import './css/common.scss'
import 'antd/dist/antd.css';
import routes from './route/router.js'
class App extends Component {
		componentDidMount() {
			resetFontSize(document, window)
	}
  render() {
    return (
        <Router>
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
      </Router>
    );
  }
}

export default App;
