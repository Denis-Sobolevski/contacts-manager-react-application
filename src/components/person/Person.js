import React from "react";
import "./person.css";

function Person(props) {
  // deconstruct the props.personObject
  const image = props.personObject.picture.large;
  const {first, last } = props.personObject.name;

  return (
    <div className="person">
      <figure>
        <img src={image} alt={image} />
      </figure>
      <div>
        <p>{first +" "+ last}</p>
      </div>
    </div>
  );
}

export default Person;
