import { useState } from "react";

import axios from "axios";

const SignUp = ({ setSignUpVisible, setLoginVisible }) => {
  // Create the useStates
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newsletter, setNewsletter] = useState(false);

  // When we change an input, it sets the useState...
  const onChange = (event, target) => {
    if (target === "username") {
      setUsername(event.target.value);
    } else if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    } else if (target === "newsletter") {
      setNewsletter(!newsletter);
    }
  };

  // Let's post the datas
  const postData = async (username, email, password, newsletter) => {
    try {
      const { data } = await axios.post(
        "https://site--marvel--dzk9mdcz57cb.code.run/user/signup",
        {
          email: email,
          password: password,
          username: username,
          newsletter: newsletter,
        }
      );
      alert("Votre compte a bien été créé.");
      console.log(data);
      setVisible(false);
      // well I don't send the cookie now because I want the user to use my fancy login modal to login...
    } catch (error) {
      console.log(error.message);
    }
  };

  // Display the form to signup in a modal
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <form
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close"
          onClick={() => {
            setVisible(false);
          }}
        >
          x
        </button>
        <h2>S'inscrire</h2>
        <input
          type="text"
          id="username"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            onChange(event, "username");
          }}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) => {
            onChange(event, "email");
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de Passe"
          onChange={(event) => {
            onChange(event, "password");
          }}
        />
        <div>
          <input
            type="checkbox"
            id="newsletterCheckbox"
            name="newsletter"
            checked={newsletter}
            onChange={(event) => {
              onChange(event, "newsletter");
            }}
          />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politiques de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button
          onClick={(event) => {
            if (username && password && email) {
              event.preventDefault();
              postData(username, email, password, newsletter);
            }
          }}
        >
          S'inscrire
        </button>
        <a
          onClick={() => {
            setSignUpVisible(false);
            setLoginVisible(true);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </a>
      </form>
    </div>
  );
};

export default SignUp;
