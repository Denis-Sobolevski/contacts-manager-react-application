import React from "react";
import "./footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <p>{props.description}</p>
    </footer>
  );
}

export default Footer;
