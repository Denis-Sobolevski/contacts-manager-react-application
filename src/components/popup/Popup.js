import React, { useContext } from "react";
import "../popup.css";

// context import:
import generalContext from "../../contexts/generalContext";

function Popup(props) {
  const context = useContext(generalContext);

  // deconstructing the Person object:
  const { first, last } = props.person ? props.person.name : "";
  const phone = props.person ? props.person.phone : "";
  const city = props.person ? props.person.location.city : "";
  const street = props.person ? props.person.location.street.name : "";
  const email = props.person ? props.person.email : "";
  const picture = props.person ? props.person.picture.large : "https://www.cincinnatichildrens.org/-/media/cincinnati%20childrens/global%20shared/biographies/_setup/default-profile-image-not-available-200x200.jpg?h=200&w=200&hash=5C82B99735A8DA275748A5AB72CD9141B995647E";

  //#region METHODS:
  

  /**
   * function gathers all the input fields
   * and updates the current Person Object fields
   * by the new values given in the input's
   * and will send the Updated Person Object to be updated
   * in the peopleList Array
   */
  const editPersonHandler = e => {
    e.preventDefault(); // prevents the submit
    const inputs = e.target.querySelectorAll("input");
    
    props.person["name"]["first"] = inputs[0].value;
    props.person["name"]["last"] = inputs[1].value;
    props.person["phone"] = inputs[2].value;
    props.person["location"]["city"] = inputs[3].value;
    props.person["location"]["street"]["name"] = inputs[4].value;
    props.person["email"] = inputs[5].value;
    props.person["picture"]["large"] = inputs[6].value;

    context.edit(props.person);
    // close the edit popup after the update was completed
    props.close("popup", null);
  };

  /**
   * function gathers all the input fields
   * build a new Person Object
   * and append it to the peopleList Array
   */
  const addPersonHandler = e => {
    e.preventDefault(); // prevents the submit
    const inputs = e.target.querySelectorAll("input");
    
    const person = {
      name: { },
      location: {  street: {  }  },
      picture: { }
    };

    person["name"]["first"] = inputs[0].value;
    person["name"]["last"] = inputs[1].value;
    person["phone"] = inputs[2].value;
    person["location"]["city"] = inputs[3].value;
    person["location"]["street"]["name"] = inputs[4].value;
    person["email"] = inputs[5].value;
    person["picture"]["large"] = inputs[6].value;

    context.add(person);
    // close the edit popup after the add was completed
    props.close("popup", null);
  };

  //#endregion METHODS:

  return (
    <div
      className="popup"
      onDoubleClick={() => {
        props.close("popup", null);
      }}
    >
      <div>
        <form
          className="popupForm"
          onSubmit={props.person ? editPersonHandler : addPersonHandler}
        >
          <label htmlFor="first">First name:</label>
          <input
            type="text"
            id="first"
            required={true}
            name="first"
            defaultValue={first}
          />

          <label htmlFor="last">Last name:</label>
          <input
            type="text"
            id="last"
            required={true}
            name="last"
            defaultValue={last}
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            required={true}
            name="phone"
            defaultValue={phone}
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            defaultValue={city}
          />

          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            defaultValue={street}
          />

          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={email}
          />

          <label htmlFor="picture">Portrait Picture:</label>
          <input
            type="text"
            id="picture"
            name="picture"
            defaultValue={picture}
          />

          <input type="submit" value={props.person ? "edit" : "add"} />
        </form>
      </div>
    </div>
  );
}

export default Popup;
