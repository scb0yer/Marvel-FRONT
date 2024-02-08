import { useNavigate, Link } from "react-router-dom";

import Logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <header>
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
          <div>Favoris</div>
        </div>
      </div>
    </header>
  );
}
