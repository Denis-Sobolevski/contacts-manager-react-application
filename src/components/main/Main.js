import React from "react";
import "./main.css";

// component's imports:
import PersonList from "../peopleList/PeopleList";
// context import:
import generalContext from "../../contexts/generalContext";

class Main extends React.Component {
  //#region METHODS:

  /**
   * fetch the Person data from an external API
   */
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=6")
      .then(response => {
        if (!response.ok) {
          // an error occurred during the data fetch:
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          isDataLoaded: true,
          peopleList: json.results,
        });
      });
  }

  /**
   * each Person will be assigned an delete method
   * which will bind with the trash can icon onClick event
   * and will delete the specific component from the peopleList
   * @param {Person} personToDelete represents the personObject to delete from the list
   */
  delete = personToDelete => {
    // prevState - the previous state
    // we depend on the old peopleList
    this.setState(prevState => ({
      peopleList: prevState.peopleList.filter(
        person => person !== personToDelete
      ),
    }));
  };

  /**
   * sent as a method to the PersonList Component
   * which binds to the clear all button onClick event
   * and will clear the peopleList from all Person components
   */
  clear = () => {
    this.setState({ peopleList: [] });
  };

  /**
   *  function gets a Person object, will add it to the people list
   *  only if the person by the same name does not exists
   *  if the Person already exists, alert the user and stop
   * @param {Person} person
   */
  add = person => {
    let flag = false;

    // search for a duplicate:
    for (const p of this.state.peopleList) {
      if (
        p.name.first === person.name.first &&
        p.name.last === person.name.last
      )
        flag = true;
    }

    if (flag) {
      alert("ERROR: User already exists in the Phone book");
    } else {
      this.state.peopleList.push(person);
      this.setState({
        peopleList: this.state.peopleList.sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        ),
      });
    }
  };

  /**
   * function gets a Updated Person object after submit edit (happens
   * in the Popup component), will update the Person
   * in the peopleList
   * @param {Person} person
   */
  edit = person => {
    this.setState(prev => {
      for (let p of prev.peopleList) {
        if (p === person) {
          p = person;
          break;
        }
      }

      return { peopleList: prev.peopleList };
    });
  };

  /**
   * toggles a Popup dialog and associates a Person object with it
   * @param {string} popup the name of the state field which is responsible for
   * displaying a popup component
   * @param {Person} person the Person object to be associated with a certain popup
   */
  togglePopup = (popup, person) => {
    this.setState(prev => {
      return {
        [popup]: !prev[popup],
        personToInteractWith: person,
      };
    });
  };

  updateFilter = filter => {
    console.log(filter);
    this.setState({ filter: filter.toLowerCase() });
  };

  //#endregion METHODS:

  state = {
    isDataLoaded: false,
    peopleList: [],
    filter: "",
    infoPopup: false,
    popup: false,
    personToInteractWith: null,
  };

  render() {
    let filteredPeopleList = [];

    if (this.state.filter === "") {
      filteredPeopleList = this.state.peopleList;
    } else {
      filteredPeopleList = this.state.peopleList.filter(person => {
        const name = (person.name.first + " " + person.name.last).toLowerCase();
        return name.startsWith(this.state.filter) ? person : "";
      });
    }
    
    console.log(filteredPeopleList);
    console.log(this.state.peopleList);

    return (
      <main className="main">
        <generalContext.Provider
          value={{
            clear: this.clear,
            delete: this.delete,
            add: this.add,
            updateFilter: this.updateFilter,
            filtered: filteredPeopleList,
            edit: this.edit,
            togglePopup: this.togglePopup,
            state: this.state,
          }}
        >
          {/* if the data is not lodaded yet, show a loading gif: */}
          {this.state.isDataLoaded ? (
            <PersonList />
          ) : (
            <img
              src="https://c.tenor.com/YPOStjIfQ2IAAAAC/loading-waiting.gif"
              alt="loading..."
            />
          )}
        </generalContext.Provider>
      </main>
    );
  }
}

export default Main;
