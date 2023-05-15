import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const API_URL = "https://opentdb.com/api.php";

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const allQuestionsAnswered = questions.every((question) => {
    return question.selectedAnswer !== "";
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL, {
        params: {
          amount: 5,
          category: 18,
          difficulty: "easy",
          type: "multiple",
        },
      })
      .then((response) => {
        setQuestions(
          response.data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              selectedAnswer: "",
              showAnswer: false,
            };
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { questions, setQuestions, error, isLoading, allQuestionsAnswered };
};

export default useQuestions;
