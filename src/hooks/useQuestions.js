import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import apiClient from "../services/api-client";

const fetchQuestions = (gameOptions) => {
  const { category, difficulty } = gameOptions;

  return apiClient
    .get("/", {
      params: {
        amount: 5,
        category: category && category !== "any" ? category : 18,
        difficulty: difficulty && difficulty !== "any" ? difficulty : "easy",
        type: "multiple",
      },
    })
    .then((response) =>
      response.data.results.map((question) => ({
        ...question,
        id: nanoid(),
        selectedAnswer: "",
        showAnswer: false,
      }))
    );
};

const useQuestions = (gameOptions) =>
  useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestions(gameOptions),
    refetchOnWindowFocus: false,
  });

export default useQuestions;
