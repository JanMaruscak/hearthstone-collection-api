import React, { useState, useContext } from "react";
import Metadata from "../context/Metadata";
import Loading from "./Loading";
import ImageNotFound from '../images/no-image.png'
const axios = require("axios");

function CardInfo(props) {
  const [data, setData] = useState(null);
  const [oldQuery, setOldQuery] = useState("");
  const metadata = useContext(Metadata);

  if (props.location.search.substring(1) !== oldQuery) {
    setOldQuery(props.location.search.substring(1));
    CallApi();
  }
  function CallApi() {
    console.log(
      `https://us.api.blizzard.com/hearthstone/cards/${props.location.search.substring(
        1
      )}?locale=en_US&access_token=${props.token}`
    );

    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards/${props.location.search.substring(
          1
        )}?locale=en_US&access_token=${props.token}`
      )
      .then(response => {
        console.log(response);
        setData(response);
      });
  }

  function GetObjectById(object, id) {
    if (metadata.data[object] == null) return "Not found.";
    for (var i = 0; i < metadata.data[object].length; i++) {
      var obj = metadata.data[object][i];
      if (obj.id === id) {
        return obj.name;
      }
    }
  }

  if (data == null) return <Loading />;
  let image = data.data.image;
  if (data.data.imageGold !== "" && data.data.image === "") {
    image = data.data.imageGold;
  }
  if (data.data.battlegrounds != null) {
    image = data.data.battlegrounds.image;
  }
  if(image == null){
    image = ImageNotFound
  }

  return (
    <div className="cardInfo">
      <img src={image} alt="" />
      <h2>{data.data.name}</h2>
      <p dangerouslySetInnerHTML={{ __html: data.data.flavorText }}></p>
      <div className="infoLine">
        <div className="title">Rarity:</div>
        <div className="info">
          {GetObjectById("rarities", data.data.rarityId)}
        </div>
      </div>
      <div className="infoLine">
        <div className="title">Type:</div>
        <div className="info">
          {GetObjectById("types", data.data.cardTypeId)}
        </div>
      </div>
      <div className="infoLine">
        <div className="title">Class:</div>
        <div className="info">
          {GetObjectById("classes", data.data.classId)}
        </div>
      </div>
      <div className="infoLine">
        <div className="title">Set:</div>
        <div className="info">{GetObjectById("sets", data.data.cardSetId)}</div>
      </div>
    </div>
  );
}

export default CardInfo;
