import "./App.css";
import { useState } from "react";
import topShape from "./assets/images/top-shape.png";
import bottomShape from "./assets/images/bottom-shape.png";
import QuestionList from "./components/QuestionList/QuestionList";
import QuizForm from "./components/QuizForm/QuizForm";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";

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
      <img className="top-shape" src={topShape} alt="top-shape"></img>

      {isGameStarted ? (
        <section className="game-container">
          <QuestionList
            gameOptions={gameOptions}
            handleGameStart={handleGameStart}
            handleNoQuestionsError={handleNoQuestionsError}
          />
        </section>
      ) : (
        <>
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
          <footer>
            <p>Made with 💖 by Keerty👩‍💻</p>
            <ul>
              <li>
                <a href="https://github.com/keertyverma">
                  <BsGithub size={15} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/keertyverma/">
                  <BsLinkedin size={15} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/KeertyVerma">
                  <BsTwitter size={15} />
                </a>
              </li>
            </ul>
          </footer>
        </>
      )}

      <img className="bottom-shape" src={bottomShape} alt="bottom-shape"></img>
    </main>
  );
}

export default App;
