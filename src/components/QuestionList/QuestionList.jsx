import "./QuestionList.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import getQuestions from "../../hooks/get-questions";
import Question from "../Question/Question";

export default function QuestionList({ handleGameStart }) {
  const [questions, setQuestions] = useState([]);
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const allQuestionsAnswered = questions.every((question) => {
    return question.selectedAnswer !== "";
  });

  useEffect(() => {
    getQuestions().then((questions) =>
      setQuestions(
        questions.map((question) => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: "",
            showAnswer: false,
          };
        })
      )
    );
  }, []);

  useEffect(() => {
    if (allQuestionsAnswered) {
      let score = 0;
      questions.forEach((question) => {
        if (question.correct_answer === question.selectedAnswer) {
          score += 1;
        }
      });

      setScore(score);
      setShowCheckAnswer(true);
    } else {
      setShowCheckAnswer(false);
    }
  }, [questions]);

  const handleSelectAnswer = (questionId, answer) => {
    if (!isGameOver) {
      // set selected answer for given question with questionId

      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => {
          return question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question;
        })
      );
    }
  };

  const renderedQuestions = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        question={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        selectedAnswer={question.selectedAnswer}
        showAnswer={question.showAnswer}
        handleSelectAnswer={handleSelectAnswer}
      />
    );
  });

  const checkAnswer = () => {
    if (allQuestionsAnswered) {
      setIsGameOver(true);

      setQuestions((prevQuestions) =>
        prevQuestions.map((qus) => {
          return {
            ...qus,
            showAnswer: true,
          };
        })
      );
    }
  };

  const resetGame = () => {
    setScore(0);
    setIsGameOver(false);
    handleGameStart();
  };

  return (
    <>
      {renderedQuestions.length === 0 ? (
        <div className="loading">Quiz is on the way...</div>
      ) : (
        <section className="question-list-container">
          {renderedQuestions}

          <div className="show-result">
            {isGameOver && (
              <h3 className="correct-answer">
                You scored {score}/5 correct answers
              </h3>
            )}

            <button
              className={`btn-primary ${
                showCheckAnswer
                  ? "btn-check-answers"
                  : "btn-check-answers-disabled"
              }`}
              onClick={isGameOver ? resetGame : checkAnswer}
            >
              {isGameOver ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
