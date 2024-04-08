import React from 'react'

function Cards(props) {
  return (
        <div class="hotel_card">
            <div class="hotel_card-content">
              <h3>{props.title}</h3>
              ......
              <p>{props.des}</p>
            </div>
        </div>
  )
}

export default Cards
