import React, { useState } from "react";
import { withRouter } from "react-router-dom";
// import Metadata from "../context/Metadata";
import SelectOptions from "./SelectOptions";

const allowedSelects = {
  set: ["constructed", "arena"],
  tier: ["battlegrounds"],
  class: ["constructed", "arena"],
  keyword: ["constructed", "arena", "battlegrounds"],
  minionType: ["constructed", "arena", "battlegrounds"],
};

function Search(props) {
  const [search, setSearch] = useState("");
  // const metadata = useContext(Metadata);
  const [queries, setQueries] = useState({});
  const [gameMode, setGameMode] = useState("constructed");

  function Redir(e) {
    let query = "&gameMode=" + document.getElementById("gameMode").value;
    for (const [key, value] of Object.entries(queries)) {
      if (value === "all") continue;
      if (allowedSelects[key].includes(gameMode)) query += `&${key}=${value}`;
    }
    props.history.push({ pathname: "cards", search: search + query });
    e.preventDefault();
  }
  function ChangeQuery(name, value) {
    queries[name] = value;
  }
  function ChangeGameMode(value) {
    setGameMode(value);
  }
  let options = <React.Fragment></React.Fragment>;
  if (gameMode === "constructed" || gameMode === "arena") {
    options = (
      <React.Fragment>
        <SelectOptions
          objectName="sets"
          queryName="set"
          prettyName="Set:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
        <SelectOptions
          objectName="classes"
          queryName="class"
          prettyName="Class:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
        <SelectOptions
          objectName="minionTypes"
          queryName="minionType"
          prettyName="Minion type:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
        <SelectOptions
          objectName="keywords"
          queryName="keyword"
          prettyName="Keyword:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
      </React.Fragment>
    );
  } else {
    options = (
      <React.Fragment>
        <SelectOptions
          optionsObject={{
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            hero: "Hero"
          }}
          queryName="tier"
          prettyName="Card tier:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
        <SelectOptions
          objectName="minionTypes"
          queryName="minionType"
          prettyName="Minion type:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
        <SelectOptions
          objectName="keywords"
          queryName="keyword"
          prettyName="Keyword:"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        />
      </React.Fragment>
    );
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
      <div id="details">
        <div className="dynamicSelect">
          Game mode:
          <select
            name="gameMode"
            id="gameMode"
            value={gameMode}
            onChange={e => ChangeGameMode(e.target.value)}
          >
            <option value="constructed">Standard & Wild Format</option>
            <option value="battlegrounds">Battlegrounds</option>
            <option value="arena">Current Arena Cards</option>
          </select>
        </div>
        {options}
        {/* <SelectOptions
          objectName="sets"
          class="constructed"
          queryName="set"
          onValueChange={(name, value) => ChangeQuery(name, value)}
        /> */}
      </div>
      <input
        className="searchButton"
        type="button"
        value="Search"
        onClick={e => Redir(e)}
      />
    </form>
  );
}

export default withRouter(Search);
