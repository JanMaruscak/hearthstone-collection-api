import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Search(props) {
  const [search, setSearch] = useState("");

  function Redir(e) {
    props.history.push({ pathname: "cards", search: search });
    e.preventDefault();
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
      <input className="searchButton" type="button" value="Search" />
    </form>
  );
}

export default withRouter(Search);
