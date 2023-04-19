import axios from "axios";

const apiUrl = "https://opentdb.com/api.php";

const getQuestions = async () => {
  // get questions related to
  const response = await axios.get(apiUrl, {
    params: {
      amount: 5,
      category: 18,
      difficulty: "easy",
      type: "multiple",
    },
  });

  return response.data.results;
};

export default getQuestions;
