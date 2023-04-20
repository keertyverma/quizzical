import "./App.css";
import { useState } from "react";
import topShape from "./assets/images/top-shape.png";
import bottomShape from "./assets/images/bottom-shape.png";
import QuestionList from "./components/QuestionList/QuestionList";

function App() {
  const [isGameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => setGameStarted((prevState) => !prevState);

  return (
    <main>
      <img className="top-shape" src={topShape}></img>
      <img className="bottom-shape" src={bottomShape}></img>

      {isGameStarted ? (
        <section className="game-container">
          <QuestionList handleGameStart={handleGameStart} />
        </section>
      ) : (
        <section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p>Play, learn, and conquer</p>
          <button className="btn-primary" onClick={handleGameStart}>
            Start Quiz
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
