import axios from "axios";

export default async function getRandom20Question() {
  const options = {
    method: "GET",
    url: "https://ases-quiz-api1.p.rapidapi.com/questions/random/20",
    headers: {
      "X-RapidAPI-Key": "7fc366e403mshd83d3c2a4bf3e71p114c0fjsne4ea8308a015",
      "X-RapidAPI-Host": "ases-quiz-api1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    if (response.data && response.data.questions) {
      return response.data.questions;
    } else {
      throw new Error("Invalid data structure");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}
