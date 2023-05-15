import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "./Question.css";

export default function Question({
  id,
  questionNumber,
  question,
  correctAnswer,
  incorrectAnswers,
  selectedAnswer,
  showAnswer,
  handleSelectAnswer,
}) {
  const incorrectAnswerElements = incorrectAnswers.map((answer) => {
    const incorrectAnswerClassName = `
      question-btn 
      ${selectedAnswer === answer && "question-btn-selected"}
      ${showAnswer && selectedAnswer === answer && "question-btn-incorrect"}
    `;

    return (
      <button
        key={nanoid()}
        className={incorrectAnswerClassName}
        onClick={() => {
          handleSelectAnswer(id, answer);
        }}
      >
        {decode(answer)}
      </button>
    );
  });

  const correctAnswerClassName = `
    question-btn 
    ${selectedAnswer === correctAnswer && "question-btn-selected"}
    ${showAnswer && "question-btn-correct"}
    
  `;

  const correctAnswerElement = (
    <button
      key={nanoid()}
      className={correctAnswerClassName}
      onClick={() => {
        handleSelectAnswer(id, correctAnswer);
      }}
    >
      {decode(correctAnswer)}
    </button>
  );

  incorrectAnswerElements.push(correctAnswerElement);

  const sortedAnswerElement = incorrectAnswerElements.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );

  return (
    <article className="question-container">
      <h2 className="question-text">
        {questionNumber}
        {". "}
        {decode(question)}
      </h2>
      <div className="answer-list">{sortedAnswerElement}</div>
    </article>
  );
}
