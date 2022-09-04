import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import Geolocation from "./components/Geolocation";


function App() {
  return (
    <div className="App">
      <Header />
      <Geolocation />

    </div>
  );
}

export default App;
