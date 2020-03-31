import React from 'react';
import { withRouter } from "react-router-dom";
import ImageNotFound from '../images/no-image.png'


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
  if(image == null){
    image = ImageNotFound
  }
  return (
    <div className="card" onClick={e => ShowCardInfo(e)}>
      <img src={image} alt=""/>
      <h2>{props.card.name}</h2>
    </div>
  );
}

export default withRouter(SimpleCard)