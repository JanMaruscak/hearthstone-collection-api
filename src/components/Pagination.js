import React from "react";
import { withRouter } from "react-router-dom";

function Pagination(props) {
  let elements = [];
  let increment = 0;
  
  if (props.selected > 7) {
    // while (increment < props.selected + 1) {
    //   increment++;
    // }
    increment = props.selected - 7
  }
  for (
    let i = 1 + increment;
    i < Math.min(props.pageCount + 1, 11 + increment);
    i++
  ) {
    let element = (
      <div
        key={i}
        className={props.selected === i ? "page selected" : "page"}
        onClick={e => HandleClick(e, i)}
      >
        {i}
      </div>
    );
    elements.push(element);
  }
  function HandleClick(e, i) {
    if (i < 1 || i > props.pageCount) return;
    let splitLoc = props.location.search.split("&");
    let newUrl = "";
    var foundPage = false;
    splitLoc.forEach(element => {
      let lineSplit = element.split("=");
      if (lineSplit[0] === "page") {
        element = `page=${i}`;
        foundPage = true;
      }
      newUrl += element + "&";
    });
    if (!foundPage) {
      newUrl += `page=${i}`;
    }
    if (newUrl[newUrl.length - 1] === "&") {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }

    props.history.push({ pathname: "cards", search: newUrl });

    e.preventDefault();
  }
  if (props.pageCount === 1) return "";
  return (
    <div className="pagination">
      <div className="page" onClick={e => HandleClick(e, props.selected - 1)}>
        Prev
      </div>
      {elements}
      <div className="page" onClick={e => HandleClick(e, props.selected + 1)}>
        Next
      </div>
    </div>
  );
}

export default withRouter(Pagination);
