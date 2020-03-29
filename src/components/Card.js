import React from 'react';
import { withRouter } from "react-router-dom";


function SimpleCard(props) {
  function ShowCardInfo(e){    
    props.history.push({ pathname: "card", search: props.card.id.toString()});
    e.preventDefault()

  }

  let image = props.card.image
  if(props.card.imageGold !== "" && props.card.image === ""){
    image = props.card.imageGold
  }
  if(props.card.battlegrounds != null){
    image = props.card.battlegrounds.image
  }
  return (
    <div className="card" onClick={e => ShowCardInfo(e)}>
      {/* <h2>{props.card.name}</h2> */}
      <img src={image} alt=""/>
    </div>
  );
}

export default withRouter(SimpleCard)