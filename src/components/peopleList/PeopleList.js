import React, { useContext } from "react";
import "./people-list.css";
import uuid from "react-uuid";

// trash icon import:
import { FaTrashAlt, FaInfoCircle, FaEdit, FaUserPlus } from "react-icons/fa";

// component's imports:
import Person from "../person/Person";
import InfoPopup from "../infoPopup/InfoPopup";
import Popup from "../popup/Popup";

// context import:
import generalContext from "../../contexts/generalContext";


function PeopleList() {
  const context = useContext(generalContext);
  console.log(context)

  function filterByName(e) {
    context.updateFilter(e.target.value);
  }

  const peopleList = context.filtered.map(person => (
      <div key={uuid()} className="personContainer">
        <Person personObject={person} />
        
        <div className="buttons">
          <FaEdit className="edit" onClick={ () => {context.togglePopup("popup", person)}}/>
          <FaInfoCircle className="info" onClick={ () => {context.togglePopup("infoPopup", person)}} />
          <FaTrashAlt className="trash" onClick={() => {context.delete(person);}}/>
        </div>

      </div>
    ));

    return (
      <div className="peopleList">
        <p>{context.filtered.length ?
         context.filtered.length + " Contacts are Available" : "There are no Contacts Available"}</p>
        
        <div className="searchMenu">
        <form>
            <label htmlFor="search">Search by name</label>
            <input
              type="text"
              id="search"
              name="search"
              onChange={filterByName}
           />
          </form>
          <FaUserPlus className="add" onClick={ () => {context.togglePopup("popup", null)}}/>
        </div>

        <div className="scrollable"> {peopleList} </div>

        {context.state.infoPopup && <InfoPopup person={context.state.personToInteractWith} close={context.togglePopup}/>}
        {context.state.popup && <Popup person={context.state.personToInteractWith} close={context.togglePopup}/>}

        <button onClick={context.clear}> Clear All </button>
      </div>
    );
  
}

export default PeopleList;
