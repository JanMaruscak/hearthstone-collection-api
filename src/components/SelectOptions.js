import React, { useContext } from "react";
import Metadata from "../context/Metadata";
import { useEffect } from "react";

function SelectOptions(props) {
  const metadata = useContext(Metadata);
  // console.log(metadata.data[props.objectName]);
  function HandleChange() {
    props.onValueChange(
      props.queryName,
      document.getElementById(props.queryName).value
    );
  }
  useEffect(() => {
    props.onValueChange(props.queryName, "all");
  }, []);
  let options = [];
  if (props.optionsObject != null) {
    Object.keys(props.optionsObject).forEach(function(k) {
      options.push(
        <option key={k + props.optionsObject[k]} value={k}>
          {props.optionsObject[k]}
        </option>
      );
    });
  } else {
    metadata.data[props.objectName].map((value, index) => {
      options.push(
        <option key={index} value={value.slug}>
          {value.name}
        </option>
      );
    });
  }
  if (document.getElementById(props.queryName) != null) {
    HandleChange();
  }
  return (
    <div className="dynamicSelect">
      <div className="name">{props.prettyName}</div>
      <select
        name={props.queryName}
        id={props.queryName}
        key={props.queryName}
        onChange={HandleChange}
      >
        <option value="all">All</option>
        {options}
      </select>
    </div>
  );
}

export default SelectOptions;
