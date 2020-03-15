import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'

import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import History from './components/express/history'

import Delivery from './components/express/delivery'
import DeliveryDetails from './components/express/DeliveryDetail'
import firstpage from './components/dashboard/Firstpage'
import firstpage2 from './components/dashboard/Firstpage2'
import CreateProject from './components/projects/CreateProject'
import ManagePayment from './components/express/ManagePayment'
import UploadProduct from './components/uploadProduct/uploadPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={UploadProduct} />
            <Route path='/deliveryProject/:id' component={DeliveryDetails} />
            <Route path='/history' component={History} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/firstpage' component={firstpage} />
            <Route path='/firstpage2' component={firstpage2} />
            <Route path='/manage' component={ManagePayment} />
            <Route path='/upload' component={UploadProduct} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;