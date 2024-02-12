import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function CharactersPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // data collected by the request
  const [data, setData] = useState();
  // number of results to skip in request (100results/page), when we click on the button -> +100
  const [skip, setSkip] = useState(0);
  // list of the names for the autocomplete research (which doesn't work so much, I agree...
  const [items, setItems] = useState([]);
  // for remainding, no search here because it's in props, so it can be reset when we click on the logo

  // when we search something into the search autocomplete bar, it updates what we search on search and launch the request to update the items list and data.
  const handleOnSearch = (string, results) => {
    const word = string;
    props.setSearch(word);
    console.log(props.search);
  };

  // when we select the result of the autocomplete search bar, it update the search and lauch the request too with the item.
  const handleOnSelect = (item) => {
    const word = item.name;
    props.setSearch(word);
    console.log(props.search);
  };

  // how the results are displayed in the autocomplete search bar...
  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    );
  };

  // When search is updated, request is lauched to get all the characters that match with the name and the skip value.
  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/characters/${skip}/`;
        if (props.search.length > 0) {
          // well, I noticed that there are some issues with the () in the url, so I keep only what's before them...
          const word = props.search.split("(");
          urlRequest += `${word[0]}`;
        }
        const response = await axios.get(urlRequest);
        // I reset the items list
        setItems([]);
        // I add each name and id into the items list to update the autocomplete research
        for (let i = 0; i < response.data.results.length; i++) {
          const item = { id: i, name: response.data.results[i].name };
          const newItems = [...items];
          newItems.push(item);
          setItems(newItems);
        }
        setData(response.data);
        setIsLoading(false);
        setSkip(0);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [props.search]);

  // when skip is modified, i launch a request to get all the datas matching with skip value. No character name in that request 'cause that doesn"t make sense to look for a special character into a special page, there are not 100 characters who have the same name...
  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/characters/${skip}/`;
        if (props.search.length > 0) {
          urlRequest += `${props.search}`;
        }
        const response = await axios.get(urlRequest);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [skip]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="relative">
      <div className="navigation">
        <div className="invisibleLarge">
          <FontAwesomeIcon
            icon="bars"
            size="xl"
            style={{ color: "white" }}
            onClick={() => {
              props.setMenuVisible(true);
              console.log(props.menuVisible);
            }}
          />
        </div>
        <div>
          <div style={{ width: 300 }}>
            <ReactSearchAutocomplete
              styling={{
                backgroundColor: "black",
                height: "25px",
                border: "none",
                color: "white",
              }}
              items={items}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </div>
        <div>
          <Link
            to="/"
            onClick={() => {
              props.setSearch("");
            }}
          >
            Personnages
          </Link>
          <Link
            to="/comics"
            onClick={() => {
              props.setSearch("");
            }}
          >
            Bandes Dessinées
          </Link>
          <Link to="/user">Favoris</Link>
        </div>
      </div>
      <div className="pageCount">
        <div>
          {skip > 99 && (
            <>
              <FontAwesomeIcon
                icon="chevron-left"
                size="2xl"
                style={{ color: "#5f0c18" }}
                onClick={() => {
                  setSkip(0);
                }}
              />
              <span className="small">Retour page 1</span>
            </>
          )}
        </div>
        <div>
          {skip > 99 && (
            <FontAwesomeIcon
              icon="chevron-left"
              size="xl"
              style={{ color: "#5f0c18" }}
              onClick={() => {
                setSkip(skip - 100);
              }}
            />
          )}
        </div>
        <div className="small">
          Page {skip === 0 ? "1" : skip / 100 + 1} sur{" "}
          {Math.ceil(data.count / 100)}
        </div>
        <div>
          {data.count > skip + 100 && (
            <FontAwesomeIcon
              icon="chevron-right"
              size="xl"
              style={{ color: "#5f0c18" }}
              onClick={() => {
                setSkip(skip + 100);
              }}
            />
          )}
        </div>
        <div>
          {data.count > skip + 100 && (
            <>
              <span className="small">
                Aller page {Math.ceil(data.count / 100)}
              </span>
              <FontAwesomeIcon
                icon="chevron-right"
                size="2xl"
                style={{ color: "#5f0c18" }}
                onClick={() => {
                  setSkip(Math.floor(data.count / 100) * 100);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="containerToSwip">
        <div>
          <div className="swip">
            {skip > 99 && (
              <FontAwesomeIcon
                icon="chevron-left"
                size="2xl"
                style={{ color: "#5f0c18" }}
                onClick={() => {
                  setSkip(skip - 100);
                }}
              />
            )}
          </div>
        </div>
        <div className="mainContainer">
          {data.results.map((character, index) => {
            const portrait = `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`;
            return (
              <Link
                to={`/character/${character._id}`}
                key={index}
                className="element"
              >
                <div>{character.name}</div>
                <div>
                  <img src={portrait} alt={character.name} />
                </div>
                <div>{character.description}</div>
              </Link>
            );
          })}
        </div>
        <div>
          <div className="swip">
            {data.count > skip + 100 && (
              <FontAwesomeIcon
                icon="chevron-right"
                size="2xl"
                style={{ color: "#5f0c18" }}
                onClick={() => {
                  setSkip(skip + 100);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
