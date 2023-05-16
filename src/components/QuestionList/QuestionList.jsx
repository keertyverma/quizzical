import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useQuestions from "../../hooks/useQuestions";
import Question from "../Question/Question";
import "./QuestionList.css";

export default function QuestionList({
  gameOptions,
  handleGameStart,
  handleNoQuestionsError,
}) {
  const { data, isFetching, error } = useQuestions(gameOptions);
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data && data.length !== 0) {
      setQuestions([...data]);
      handleNoQuestionsError(false);
    } else if (!isFetching) {
      handleNoQuestionsError(true);
      handleGameStart();
    }
  }, [data]);

  const allQuestionsAnswered = questions?.every((question) => {
    return question.selectedAnswer !== "";
  });

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

  if (isFetching)
    return (
      <div className="loading">
        Are you ready? <br />
        Quiz is on the way...
      </div>
    );

  if (error)
    return (
      <div className="error">
        Something went wrong. <br />
        Please try again later.
      </div>
    );

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

  const renderedQuestions = questions?.map((question, index) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        questionNumber={index + 1}
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
    <section className="question-list-container">
      {renderedQuestions}

      <div className="show-result">
        {isGameOver && (
          <h3 className="correct-answer">
            You scored {score}/5 correct answers.
            {score === 5 ? (
              <>
                🥳🙌 <Confetti />
              </>
            ) : score >= 3 ? (
              "✌️😎"
            ) : (
              <p>Let's play again ✨</p>
            )}
          </h3>
        )}

        <button
          className={`btn-primary ${
            showCheckAnswer ? "btn-check-answers" : "btn-check-answers-disabled"
          }`}
          onClick={isGameOver ? resetGame : checkAnswer}
        >
          {isGameOver ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </section>
  );
}
