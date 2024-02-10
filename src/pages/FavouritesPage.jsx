import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function FavouritesPage(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // get the datas
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          "https://site--marvel--dzk9mdcz57cb.code.run/userData/",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, [props.token]);
  console.log(user);

  const deleteFavourite = async (element, id) => {
    try {
      const { data } = await axios.post(
        `https://site--marvel--dzk9mdcz57cb.code.run/user/removeFavourite${element}/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // displays the infos of the user only if he logged.
  return user ? (
    <section className="profil">
      <div>
        <div>
          <div>Username :</div>
          <div>{user.username}</div>
        </div>
        <div>
          <div>Email :</div>
          <div>{user.email}</div>
        </div>
        <div>
          <div>Bandes dessinées préférées :</div>
          <div>
            {user.favourites.comics.length > 0 &&
              user.favourites.comics.map((comic, index) => {
                return (
                  <div key={index}>
                    <div>{comic.title}</div>
                    <div>
                      <img src={comic.picture} alt={comic.title} />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          console.log(comic._id);
                          deleteFavourite("Comic", comic.id);
                        }}
                      >
                        Supprimer des favoris
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div>Personnages préférés :</div>
          <div>
            {user.favourites.characters.length > 0 &&
              user.favourites.characters.map((character, index) => {
                return (
                  <div key={index}>
                    <div>{character.name}</div>
                    <div>
                      <img src={character.picture} alt={character.name} />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          console.log(character._id);
                          deleteFavourite("Character", character.id);
                        }}
                      >
                        Supprimer des favoris
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div>
            <button
              onClick={() => {
                props.setToken(null);
                navigate("/");
              }}
            >
              Déconnecte-toi
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="notLogged">
      <div>Vous devez vous identifier pour accéder à cette page.</div>
      <div>
        <button
          onClick={() => {
            props.setSignUpVisible(true);
          }}
        >
          S'inscrire
        </button>

        <button
          onClick={() => {
            props.setLoginVisible(true);
          }}
        >
          Se connecter
        </button>
      </div>
    </section>
  );
}
