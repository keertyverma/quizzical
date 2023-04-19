import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./Question.css";

export default function Question({
  question,
  correctAnswer,
  incorrectAnswers,
}) {
  const reshuffleArray = (arr, item) => {
    // add answer at random index inside options list
    const options = [...arr];
    options.splice(Math.floor(Math.random() * 4), 0, item);

    return options;
  };

  const incorrectAnswerElements = incorrectAnswers.map((answer) => {
    return (
      <button className="question-btn" key={nanoid()}>
        {decode(answer)}
      </button>
    );
  });

  const correctAnswerElement = (
    <button className="question-btn" key={nanoid()}>
      {decode(correctAnswer)}
    </button>
  );

  const answerElements = reshuffleArray(
    incorrectAnswerElements,
    correctAnswerElement
  );

  return (
    <article className="question-container">
      <h2 className="question-text">{decode(question)}</h2>
      <div className="answer-list">{answerElements}</div>
    </article>
  );
}
