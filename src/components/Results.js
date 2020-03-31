import React, { useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import { useEffect } from "react";
import Pagination from "./Pagination";
const axios = require("axios");
var history = "";

function Results(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    CallApi();
  }, []);
  function CallApi() {
    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&textFilter=${props.location.search.substring(
          1
        )}&access_token=${props.token}`
      )
      .then(response => {
        setData(null);
        setData(response);
      });
  }

  if (props.location !== history || history === "") {
    CallApi();
    history = props.location;
  }

  if (data == null || data.data.cards == null) return <Loading />;

  return (
    <>
      <div className="results">
        {data.data.cards.map(function(d, idx) {
          return <Card key={idx + data.data.page} card={d} />;
        })}
      </div>
      <Pagination pageCount={data.data.pageCount} selected={data.data.page} />
    </>
  );
}

export default Results;
