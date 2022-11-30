import axios from "axios";

const api_url = "http://localhost:3001/videogames";

const postCustomGame = async (formToSend) => {
  formToSend.released = [...formToSend.released].reverse().join("-");
  formToSend.rating = +formToSend.rating
  formToSend.genres = formToSend.genres.map(genre => +genre)
  formToSend.description = '<p>' + formToSend.description + '</p>'

  try {
    const res = await axios.post(api_url, formToSend);
    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export default postCustomGame;
