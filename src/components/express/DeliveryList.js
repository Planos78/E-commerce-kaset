import React from 'react'
import DeliverySummary from './DeliverySummary'
import { Link } from 'react-router-dom'

const DeliveryList = ({ delivery }) => {
  return (
    <div className="project-list section">
      {delivery && delivery.map(deliveryProject => {
        return (
          <Link to={'/deliveryProject/' +deliveryProject.id}>
            <DeliverySummary deliveryProject={deliveryProject} key={deliveryProject.id} />
          </Link>
        )
      })}
    </div>
  )
}

export default DeliveryList