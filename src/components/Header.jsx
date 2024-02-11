import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

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
