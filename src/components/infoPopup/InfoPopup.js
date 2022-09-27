import React from "react";
import "../popup.css";

function InfoPopup(props) {
  // deconstructing the Person object:
  const image = props.person.picture.large;
  const {first, last } = props.person.name;
  const phone = props.person.phone;
  const email = props.person.email;
  const city = props.person.location.city;
  const street = props.person.location.street.name

  return (
    <div className="popup" onDoubleClick={()=> props.close("infoPopup", null)}>
      <div>
        <p><b>Name: </b>{first +" "+ last}</p>
        <p><b>Phone: </b>{phone}</p>
        <p><b>Address: </b>{city +","+ street}</p>
        <p><b>Email: </b>{email}</p>
        <p><b>Image url: </b><a target="_blank" rel="noreferrer" href={image}>{image}</a></p>
      </div>
    </div>
  );
}

export default InfoPopup;
