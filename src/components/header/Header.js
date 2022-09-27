import React from "react";
import "./header.css";

function Header(props) {
  return (
    <header className="header">
      <p>{props.heading}</p>
    </header>
  );
}

export default Header;
