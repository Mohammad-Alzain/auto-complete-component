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
      return (
        (e.name + " ").search(search) != -1
        //e.FirsName.search(SearchName) || e.lastName.search(SearchName) != -1
      );
    });
    setData(filteredData);
  }, [search]);

  return (
    <div className={styles.container}>
      <input
        onFocus={(e) => {
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
        <div
          onClick={() => {
            setdisplayData(false);
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className={styles.dataContainer}>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSearch(item.name);
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
