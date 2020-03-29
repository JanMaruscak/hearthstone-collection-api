import React, { useState, useContext } from "react";
import Card from "./Card";
const axios = require("axios");

function Results(props) {
  
  const [data, setData] = useState(null);
  const [oldQuery, setOldQuery] = useState("");

  if (props.location.search.substring(1) !== oldQuery) {
    CallApi();
    setOldQuery(props.location.search.substring(1));
  }
  function CallApi() {
    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&textFilter=${props.location.search.substring(
          1
        )}&access_token=USqkDWiIPnR79anLFiUtCAK8mkSanS68zL`
      )
      .then(response => {
        console.log(response);
        setData(response);
      });
  }

  if (data == null) return "Nothing found";
  return (
    <div className="results">
      {data.data.cards.map(function(d, idx) {
        return <Card key={idx} card={d} />;
      })}
    </div>
  );
}

export default Results;
