import "./App.css";
import { useState } from "react";
import topShape from "./assets/images/top-shape.png";
import bottomShape from "./assets/images/bottom-shape.png";
import QuestionList from "./components/QuestionList/QuestionList";
import QuizForm from "./components/QuizForm/QuizForm";

function App() {
  const [isGameStarted, setGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: "",
  });

  const handleGameStart = () => setGameStarted((prevState) => !prevState);

  return (
    <main>
      <img className="top-shape" src={topShape}></img>

      {isGameStarted ? (
        <section className="game-container">
          <QuestionList
            gameOptions={gameOptions}
            handleGameStart={handleGameStart}
          />
        </section>
      ) : (
        <section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p>Play, learn & conquer</p>
          <QuizForm
            onGameStart={(options) => {
              setGameOptions({ ...gameOptions, ...options });
              handleGameStart();
            }}
          />
        </section>
      )}

      <img className="bottom-shape" src={bottomShape}></img>
    </main>
  );
}

export default App;
