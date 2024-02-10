import { useNavigate, Link } from "react-router-dom";

import Logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <header>
      {props.loginVisible
        ? document.body.classList.add("scroll-lock")
        : props.signUpVisible
        ? document.body.classList.add("scroll-lock")
        : document.body.classList.remove("scroll-lock")}
      <img
        src={Logo}
        alt="logo"
        onClick={() => {
          props.setSearch("");
          navigate("/");
        }}
      />
      <div className="navigation">
        <div>
          <input
            type="search"
            className="search"
            value={props.search}
            onChange={(event) => {
              props.setSearch(event.target.value);
            }}
          />
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
          <Link
            to="/user"
            onClick={() => {
              props.setSearch("");
            }}
          >
            Favoris
          </Link>
        </div>
      </div>
    </header>
  );
}
