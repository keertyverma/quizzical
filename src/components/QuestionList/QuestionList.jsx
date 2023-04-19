import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import getQuestions from "../../hooks/get-questions";
import Question from "../Question/Question";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions().then((questions) => setQuestions(questions));
  }, []);

  const renderedQuestions = questions.map((question) => {
    return (
      <Question
        key={nanoid()}
        question={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
      />
    );
  });

  return <>{renderedQuestions}</>;
}
