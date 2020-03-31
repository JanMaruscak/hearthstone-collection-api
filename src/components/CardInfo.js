import React, { useState, useContext, useEffect } from "react";
import Metadata from "../context/Metadata";
import Loading from "./Loading";
import ImageNotFound from "../images/no-image.png";
import BackButtonImage from "../images/back-arrow.svg";
const axios = require("axios");
var history = "";

function CardInfo(props) {
  const [data, setData] = useState(null);
  const metadata = useContext(Metadata);

  useEffect(() => {
    CallApi();
  }, []);
  if (props.location !== history || history === "") {
    CallApi();
    history = props.location;
  }
  function CallApi() {
    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards/${props.location.search.substring(
          1
        )}?locale=en_US&access_token=${props.token}`
      )
      .then(response => {
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

  if (image.trim() === "") {
    image = ImageNotFound;
  }

  return (
    <div className="cardInfo">
      <img
        id="backButton"
        src={BackButtonImage}
        onClick={props.history.goBack}
        alt="backButton"
      />
      <p className="id">{data.data.id}</p>
      <img src={image} alt={data.data.name + " image"} />
      <h2>{data.data.name}</h2>
      <p
        className="flavor"
        dangerouslySetInnerHTML={{ __html: data.data.flavorText }}
      ></p>
      <p
        className="text"
        dangerouslySetInnerHTML={{ __html: data.data.text }}
      ></p>
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
