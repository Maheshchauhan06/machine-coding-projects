import { useEffect, useState } from "react";
import "./styles.css";
import Passwordgenrator from "./Components/PasswordGenrator/PasswordGenrator";
import UseThrottel from "./Hooks/UseThrottle";
import StartRating from "./Components/StarRating/StartRating";
import Accordion from "./Components/Accordion/Accordion";
import InfiniteScroll from "./Components/InfiniteScroll/InfiniteScroll";

export default function App() {
  UseThrottel(() => console.log("hi"), 1000);
  return (
    <div className="App">
      <Accordion title="Accordion Title">
        <h1>Accordion</h1>
        <p>This is the content of the accordion.</p>
        <StartRating totalStars={5} />
      </Accordion>

      <InfiniteScroll />
    </div>
  );
}
