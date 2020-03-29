import React, { useState, useContext } from "react";
import Metadata from "../context/Metadata";
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
      )}?locale=en_US&access_token=USqkDWiIPnR79anLFiUtCAK8mkSanS68zL`
    );

    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards/${props.location.search.substring(
          1
        )}?locale=en_US&access_token=USqkDWiIPnR79anLFiUtCAK8mkSanS68zL`
      )
      .then(response => {
        console.log(response);
        setData(response);
      });
  }

  function GetObjectById(object, id) {
    if (metadata === null) return;
    if(metadata.data === null) return;
    for (var i = 0; i < metadata.data[object].length; i++) {
      var obj = metadata.data[object][i];
      if (obj.id === id) {
        return obj;
      }
    }
  }

  if (data == null || metadata == null) return "Nothing found";
  return (
    <div className="cardInfo">
      <img src={data.data.image} alt="" />
      <p dangerouslySetInnerHTML={{ __html: data.data.flavorText }}></p>
  <p>Rarity: {GetObjectById("rarities",data.data.rarityId).name}</p>
  <p>Type: {GetObjectById("types",data.data.cardTypeId).name}</p>
  <p>Class: {GetObjectById("classes",data.data.classId).name}</p>
      <p>Set: {GetObjectById("sets", data.data.cardSetId).name}</p>
    </div>
  );
}

export default CardInfo;
