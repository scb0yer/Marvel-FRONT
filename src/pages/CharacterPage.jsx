import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

export default function CharacterPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [picture_url, setPicture_url] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel--dzk9mdcz57cb.code.run/character/${id}`
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

  const addToFavourite = async () => {
    try {
      const response = await axios.post(
        `https://site--marvel--dzk9mdcz57cb.code.run/user/addFavouriteCharacter/${id}`,
        {
          name: data.name,
          picture: picture_url,
        },
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      alert("Le personnage a bien été ajouté aux favoris");
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="containerCharacter">
      <div>
        <img src={picture_url} alt={data.name} />
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
          <div>{data.name}</div>
          <div>{data.description}</div>
        </div>
        <div className="containerComicsXS">
          {data.comics.map((comic, index) => {
            const comic_picture_url = `${comic.thumbnail.path}/standard_medium.${comic.thumbnail.extension}`;
            return (
              <Link to={`/comic/${comic._id}`} key={index}>
                <img src={comic_picture_url} alt={comic.title} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
