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
  const [showError, setError] = useState(false);

  const handleGameStart = () => setGameStarted((prevState) => !prevState);

  const handleNoQuestionsError = (boolean) => setError(boolean);

  return (
    <main>
      <img className="top-shape" src={topShape}></img>

      {isGameStarted ? (
        <section className="game-container">
          <QuestionList
            gameOptions={gameOptions}
            handleGameStart={handleGameStart}
            handleNoQuestionsError={handleNoQuestionsError}
          />
        </section>
      ) : (
        <section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p>Play, Learn & Conquer</p>
          {showError && (
            <h2 className="question-error">
              Oops! We couldn't find any questions with the selected options!
            </h2>
          )}
          <QuizForm
            onGameStart={(options) => {
              setGameOptions({ ...gameOptions, ...options });
              setError(false);
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
