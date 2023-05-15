import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import apiClient from "../services/api-client";

const fetchQuestions = () =>
  apiClient
    .get("/", {
      params: {
        amount: 5,
        category: 18,
        difficulty: "easy",
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

const useQuestions = () =>
  useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    refetchOnWindowFocus: false,
  });

export default useQuestions;
