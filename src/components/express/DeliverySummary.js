import React from 'react'

const DeliverySummary = ({deliveryProject}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title grey-text">{deliveryProject.title}</span>
        <p className="grey-text">{deliveryProject.createdAt.toDate().toString()}</p>
      </div>
    </div>
  )
}
export default DeliverySummary