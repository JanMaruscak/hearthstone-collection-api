import React, { useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import { useEffect } from "react";
const axios = require("axios");
var history = "";

function Results(props) {
  const [data, setData] = useState(null);
  // const [oldQuery, setOldQuery] = useState("");

  useEffect(() => {
    console.log("EFFECT");
    CallApi();
  }, []);
  console.log(props.location);
  function CallApi() {
    console.log(
      `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&textFilter=${props.location.search.substring(
        1
      )}&access_token=${props.token}`
    );

    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&textFilter=${props.location.search.substring(
          1
        )}&access_token=${props.token}`
      )
      .then(response => {
        setData(response);
      });
  }

  if (props.location !== history || history === "") {
    console.log("CALLING API");

    CallApi();
    history = props.location;
  }

  if (data != null) {
    console.log("API DATA SET");
  } else {
    console.log("API DATA NULL");
  }
  if (data == null) return <Loading />;

  return (
    <div className="results">
      {data.data.cards.map(function(d, idx) {
        return <Card key={idx} card={d} />;
      })}
    </div>
  );
}

export default Results;
