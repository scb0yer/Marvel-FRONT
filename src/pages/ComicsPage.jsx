import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function ComicsPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/comics/${skip}/`;
        if (props.search.length > 0) {
          urlRequest += `${props.search}`;
        }
        const response = await axios.get(urlRequest);
        setData(response.data);
        setIsLoading(false);
        setSkip(0);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [props.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urlRequest = `https://site--marvel--dzk9mdcz57cb.code.run/comics/${skip}/`;
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
              <span>Retour page 1</span>
            </>
          )}
        </div>
        <div>
          Page {skip === 0 ? "1" : skip / 100 + 1} sur{" "}
          {Math.ceil(data.count / 100)}
        </div>
        <div>
          {data.count > skip + 100 && (
            <>
              <span>Aller page {Math.ceil(data.count / 100)}</span>
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
