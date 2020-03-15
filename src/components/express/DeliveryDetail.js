import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const DeliveryDetails = (props) => {
  const { deliveryProject } = props;
  if (deliveryProject) {
    return(
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">History Name: - {deliveryProject.title}</span>
          <p className="grey-text">title: {deliveryProject.title}</p>
          <p className="grey-text">Description: {deliveryProject.description}</p>
          <p className="grey-text">Price: {deliveryProject.price}</p>
        </div>
        <div className="card-action ">
          <div>History of {deliveryProject.title} </div>
          Time: {deliveryProject.createdAt.toDate().toString()}
        </div>
      </div>
    </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading deliveryProject...</p>
      </div>
  )
  }

}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const delivery = state.firestore.data.delivery;
  const deliveryProject = delivery ? delivery[id] : null
  return {
    deliveryProject: deliveryProject
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'delivery' }
  ])
)(DeliveryDetails)