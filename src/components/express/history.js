import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import DeliveryList from '../express/DeliveryList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class history extends Component {
  render() {

    // console.log(this.props);
    const { delivery, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">

          <br></br>
            <div class="jumbotron">
              <h1><dt>HISTORY</dt></h1>
              <hr class = "my-4"></hr>
            </div>

            <DeliveryList delivery={delivery} />
          </div>
        </div>
      </div>
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
)(history)