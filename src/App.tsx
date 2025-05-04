import { useEffect, useState } from "react";
import "./styles.css";
import Passwordgenrator from "./Components/PasswordGenrator/PasswordGenrator";

export default function App() {
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <Passwordgenrator />
    </div>
  );
}
