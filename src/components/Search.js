import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Metadata from "../context/Metadata";

function Search(props) {
  const [search, setSearch] = useState("");
  const metadata = useContext(Metadata);

  function Redir(e) {
    props.history.push({ pathname: "cards", search: search });
    e.preventDefault();
  }
  function CreateSelectOptions(object) {
    for (var i = 0; i < metadata.data[object].length; i++) {
      var obj = metadata.data[object][i];
      
    }
  }
  return (
    <form onSubmit={e => Redir(e)} id="searchForm">
      <input
        className="searchInput"
        type="text"
        placeholder="Search for card..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <div className="details">
        <select name="" id="">
          {metadata.data.ga}
        </select>
      </div>
      <input className="searchButton" type="button" value="Search" />
    </form>
  );
}

export default withRouter(Search);
