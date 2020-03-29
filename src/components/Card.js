import React from 'react';
import { withRouter } from "react-router-dom";


function SimpleCard(props) {
  function ShowCardInfo(e){    
    props.history.push({ pathname: "card", search: props.card.id.toString()});
    e.preventDefault()

  }

  return (
    <div className="card" onClick={e => ShowCardInfo(e)}>
      {/* <h2>{props.card.name}</h2> */}
      <img src={props.card.image} alt=""/>
    </div>
  );
}

export default withRouter(SimpleCard)