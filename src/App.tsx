import { useEffect, useState } from "react";
import "./styles.css";
import Passwordgenrator from "./Components/PasswordGenrator/PasswordGenrator";
import UseThrottel from "./Hooks/UseThrottle";

export default function App() {
  UseThrottel(() => console.log("hi"), 1000);
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <Passwordgenrator />
    </div>
  );
}
