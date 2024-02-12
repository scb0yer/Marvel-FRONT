import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function ComicPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // data collected by the request
  const [data, setData] = useState();
  // picture saved with concatenation of path, extension and option
  const [picture_url, setPicture_url] = useState();
  const { id } = useParams();

  // request to find the comic data by Id, launched by loadind the page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel--dzk9mdcz57cb.code.run/comic/${id}`
        );
        setData(response.data);
        setPicture_url(
          `${response.data.thumbnail.path}/portrait_uncanny.${response.data.thumbnail.extension}`
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // request to add the comic in favourites (on Mongo database), launched by clicking on button
  const addToFavourite = async () => {
    try {
      const response = await axios.post(
        `https://site--marvel--dzk9mdcz57cb.code.run/user/addFavouriteComics/${id}`,
        {
          title: data.title,
          picture: picture_url,
        },
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      alert("La bande dessinée a bien été ajoutée aux favoris");
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="containerCharacter">
      <div>
        <img src={picture_url} alt={data.title} />
        <button
          onClick={() => {
            if (props.token) {
              addToFavourite(id);
            } else {
              props.setLoginVisible(true);
            }
          }}
        >
          Ajouter aux favoris
        </button>
      </div>
      <div>
        <div>
          <div>{data.title}</div>
          <div>{data.description}</div>
        </div>
      </div>
    </section>
  );
}
