import React from "react";

// component imports
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

function App() {
    const description = `© denis & Ido ${ new Date().toDateString() }`;
    const heading = "Phone Book";

  return (
    <div className="app">
      <Header heading={heading} />
      <Main />
      <Footer description ={description} />
    </div>
  );
}

export default App;
