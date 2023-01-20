import React, { useEffect, useState } from "react";
import styles from "./autoComplete.module.css";

function AutoComplete() {
  const [data, setData] = useState([]);
  const [coppyData, setcoppyData] = useState([]);
  const [search, setSearch] = useState("");
  const [displayData, setdisplayData] = useState(false);
  //-------------------------------------------------------------------------
  // Split text on higlight term, include term itself into parts, ignore case
  //-------------------------------------------------------------------------
  function getHighlightedText(text, higlight) {
    if (text === "No results found") return text;
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }
  //-------------------------------------------------------------------------
  // return text component with highlight term
  //-------------------------------------------------------------------------
  const ListItem = ({ higlight, value }) => {
    return <p>{getHighlightedText(value, higlight)}</p>;
  };

  //-------------------------------------------------------------------------
  // get data from Api
  //-------------------------------------------------------------------------
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon-form", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setcoppyData(data.results);
      });
  }, []);

  //-------------------------------------------------------------------------
  // filter when the search input is changing
  //-------------------------------------------------------------------------
  useEffect(() => {
    //filter search result
    let filteredData = structuredClone(coppyData);
    filteredData = filteredData.filter(function (e, i, a) {
      return (e.name + " ").search(search) != -1;
    });
    if (filteredData.length > 0) setData(filteredData);
    else setData([{ name: "No results found" }]);
  }, [search]);
  useEffect(() => {
    const handler = () => setdisplayData(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  return (
    <div className={styles.container}>
      <input
        onClick={(e) => {
          e.stopPropagation();
          setdisplayData(true);
        }}
        placeholder="search for name"
        className={styles.autoCompleteInput}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      {displayData ? (
        <div>
          <div className={styles.dataContainer}>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (item.name != "No results found") setSearch(item.name);
                  }}
                  className={styles.item}
                >
                  <ListItem
                    key={item.name}
                    value={item.name}
                    higlight={search}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AutoComplete;
