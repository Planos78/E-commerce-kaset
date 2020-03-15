import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import DeliveryList from '../express/DeliveryList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'




class ManagePayment extends Component {

  handleChange2 = e => {
    this.setState({
      [e.target.name]: e.target.id
    })

    console.dir(this.state)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.deliveryExpress(this.state);
    this.props.history.push('/history');

    console.dir(this.state)
}


  render() {

    // console.log(this.props);
    const { delivery, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    // const total = require('./delivery.js');





    return (

      <div className="container">
        <div className="col-12">
          <br></br>
          <div class="jumbotron">
            <h1><dt>ManagePayment</dt></h1>
            <hr class="my-4"></hr>
          </div>
          <form className="white">
            <DeliveryList delivery={delivery} />
            {/* <h2><dt><p class='right' >ค่าบริการรวมทั้งหมด {total} บาท</p></dt></h2> */}
            <div class="row center" required>
              <div class="col-sm-6">
                <h5 class="card-title"><dt>Cash on Delivery</dt></h5>
                <i class="large material-icons">attach_money</i>
                <br />
                <p>
                  <label>
                    <input class="with-gap" type="radio" name='ServicePaymant'
                      onClick={this.handleChange2} id="Cash_on_Delivery" required />
                    <span>Select Cash on Delivery</span>
                  </label>
                </p>
              </div>
              <div class="col-sm-6">
                <h5 class="card-title"><dt>K-Wallet</dt></h5>
                <i class="large material-icons">credit_card</i>
                <br />
                <p>
                  <label>
                    <input class="with-gap" type="radio" name='ServicePaymant'
                      onClick={this.handleChange2} id="K_Wallet" required />
                    <span>Select K-Wallet</span>
                  </label>
                </p>
              </div>
            </div>
            <br />
            <button type="button" class="btn btn-primary btn-md btn-block">Confirm</button>
          </form>

        </div>
      </div >


    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    delivery: state.firestore.ordered.delivery,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'delivery' }
  ])
)(ManagePayment)