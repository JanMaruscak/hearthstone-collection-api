import React from "react";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Results from "./components/Results";
import CardInfo from "./components/CardInfo";
import Search from "./components/Search";
import { useEffect } from "react";
import { useState } from "react";
import { MetadataProvider } from "./context/Metadata";
import Loading from './components/Loading'
const axios = require("axios");
// const base = "https://us.api.blizzard.com/hearthstone/";
const token = "USYc7BmMd3Xj4xieyDBpaFdHmWT2Wdn9FP";

function App() {
  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://us.api.blizzard.com/hearthstone/metadata?locale=en_US&access_token=${token}`
      )
      .then(response => {
        setMetadata(response);
      });
  }, []);
  if (metadata == null) return <Loading/>
  if (metadata.data == null) return <Loading/>
  return (
    <Router>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Hearthstone Collection API</h1>
      <MetadataProvider value={metadata}>
        <Search />
        <Switch>
          <Route
            path="/cards"
            exact
            render={props => <Results {...props} token={token} />}
          />
          <Route
            path="/card"
            exact
            render={props => <CardInfo {...props} token={token} />}
          />
        </Switch>
      </MetadataProvider>
    </Router>
  );
}

export default App;
