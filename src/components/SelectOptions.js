import React, { useContext } from "react";
import Metadata from "../context/Metadata";
import { useEffect } from "react";

function SelectOptions(props) {
  const metadata = useContext(Metadata);
  console.log(metadata.data[props.objectName]);
  function HandleChange() {
    props.onValueChange(
      props.queryName,
      document.getElementById(props.objectName).value
    );
  }
  useEffect(() => {
    props.onValueChange(
      props.queryName,
      metadata.data[props.objectName][0].slug
    );
  }, []);
  return (
    <div className="dynamicSelect">
      {props.objectName}
      <select
        name={props.objectName}
        id={props.objectName}
        onChange={HandleChange}
      >
        {metadata.data[props.objectName].map((value, index) => {
          return (
            <option key={index} value={value.slug}>
              {value.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectOptions;
