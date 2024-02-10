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
          <div>Personnages préférés :</div>
          <div>
            {user.favourites.characters.length > 0 &&
              user.favourites.characters.map((character, index) => {
                const [picture_url, setPicture_url] = useEffect();
                useEffect(() => {
                  const fetchData = async () => {
                    try {
                      const { data } = await axios.get(
                        `https://site--marvel--dzk9mdcz57cb.code.run/character/${character}`
                      );
                      setPicture_url(
                        `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`
                      );
                      setIsLoading(false);
                    } catch (error) {
                      console.log(error.message);
                    }
                  };
                  fetchData();
                }, []);
                return (
                  <div key={index}>
                    <img src={picture_url} alt="personnage" />
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
