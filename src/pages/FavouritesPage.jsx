import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function FavouritesPage(props) {
  const navigate = useNavigate();

  // collect the data of the user, if he's logged
  const [user, setUser] = useState(null);

  // when token is modified (because it's required), request is lauched to get the datas of the user
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

  // when the user click on the button, it lauches that request to delete the comic or the character from the favourites
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

  // displays the infos of the user only if he's logged.
  return user ? (
    <section className="profil">
      <div>
        <div className="profilInfos">
          <div>Username :</div>
          <div>{user.username}</div>
        </div>
        <div className="profilInfos">
          <div>Email :</div>
          <div>{user.email}</div>
        </div>
        <div>
          <h2>Bandes dessinées préférées :</h2>
          <div className="carroussel">
            {user.favourites.comics.length > 0 &&
              user.favourites.comics.map((comic, index) => {
                return (
                  <div>
                    <Link
                      to={`/comic/${comic.id}`}
                      key={index}
                      className="element"
                    >
                      <div>{comic.title}</div>

                      <img src={comic.picture} alt={comic.title} />
                    </Link>
                    <div>
                      <button
                        onClick={() => {
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
          <h2>Personnages préférés :</h2>
          <div className="carroussel">
            {user.favourites.characters.length > 0 &&
              user.favourites.characters.map((character, index) => {
                return (
                  <div>
                    <Link
                      to={`/character/${character.id}`}
                      key={index}
                      className="element"
                    >
                      <div>{character.name}</div>

                      <img src={character.picture} alt={character.name} />
                    </Link>
                    <div>
                      <button
                        onClick={() => {
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
          <div className="right">
            <button
              className="logout"
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
    // If the user is not logged...
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
