import React from "react";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Results from "./components/Results";
import CardInfo from "./components/CardInfo";
import Search from "./components/Search";
import { useEffect } from "react";
import { useState } from "react";
import {MetadataProvider} from "./context/Metadata"
const axios = require("axios");
// const base = "https://us.api.blizzard.com/hearthstone/";

function App() {
  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
    axios
      .get("https://us.api.blizzard.com/hearthstone/metadata?locale=en_US&access_token=USqkDWiIPnR79anLFiUtCAK8mkSanS68zL")
      .then(response => {
        console.log(response);
        setMetadata(response);
      });
  }, []);
  if(metadata == null) return "Nothing found"
  if(metadata.data == null) return "Nothing found"
  return (
    <Router>
      <Navbar />
      <MetadataProvider value={metadata}>
      <Search />
      <Switch>
        <Route path="/cards" exact component={Results} />
        <Route path="/card" exact component={CardInfo} />
      </Switch>
      </MetadataProvider >
    </Router>
  );
}

export default App;
