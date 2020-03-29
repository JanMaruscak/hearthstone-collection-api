import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Metadata from "../context/Metadata";
import SelectOptions from './SelectOptions'

function Search(props) {
  const [search, setSearch] = useState("");
  const metadata = useContext(Metadata);
  const [queries, setQueries] = useState({})

  function Redir(e) {
      let query = ""
      for (const [key, value] of Object.entries(queries)) {
       query += `&${key}=${value}`
      }
    props.history.push({ pathname: "cards", search: search + query });
    e.preventDefault();
  } 
  
  function ChangeQuery(name, value){
    // let newQueries = [...queries]
    queries[name] = value;
    // setQueries(newQueries)
    console.log(queries);
    

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
          <SelectOptions objectName="gameModes" queryName="gameMode" onValueChange={(name,value) => ChangeQuery(name,value)}/>
          <SelectOptions objectName="sets" queryName="set" onValueChange={(name,value) => ChangeQuery(name,value)}/>
          
      </div>
      <input className="searchButton" type="button" value="Search" onClick={e => Redir(e)}/>
    </form>
  );
}

export default withRouter(Search);
