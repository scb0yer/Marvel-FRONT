import { Link } from "react-router-dom";

export default function Menu(props) {
  return (
    <div
      className="menu"
      onClick={() => {
        props.setMenuVisible(false);
      }}
    >
      <div>
        <Link to="/">Personnages</Link>
        <Link to="/comics">Bandes Dessinées</Link>
        <Link to="/user">Favoris</Link>
      </div>
    </div>
  );
}
