import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function ComicsPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [skip, setSkip] = useState(0);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleOnSearch = (string, results) => {
    const word = string;
    setSearch(word);
    console.log(search);
  };

  const handleOnSelect = (item) => {
    const word = item.name;
    setSearch(word);
    console.log(search);
  };

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/comics/${skip}/`;
        if (search.length > 0) {
          const word = search.split(" ");
          urlRequest += `${word[0]}`;
        }
        const response = await axios.get(urlRequest);
        setItems([]);
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
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/comics/${skip}/`;
        if (search.length > 0) {
          urlRequest += `${search}`;
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
          {data.results.map((comic, index) => {
            const portrait = `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`;
            return (
              <Link to={`/comic/${comic._id}`} key={index} className="element">
                <div>{comic.title}</div>
                <div>
                  <img src={portrait} alt={comic.title} />
                </div>
                <div>{comic.description}</div>
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
