import { useNavigate } from "react-router-dom";
import React from "react";

import Logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();

  // returns only the logo. First there where also the navigation menu, but as I used autocomplete research, the items in the autocomplete research had to result from the request (of characters or comics)
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
    </header>
  );
}
