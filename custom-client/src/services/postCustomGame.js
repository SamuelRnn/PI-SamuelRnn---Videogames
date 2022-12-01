import axios from "axios";

const postCustomGame = async (formToSend) => {
  formToSend.released = [...formToSend.released].reverse().join("-");
  formToSend.rating = +formToSend.rating
  formToSend.genres = formToSend.genres.map(genre => +genre)
  formToSend.description = '<p>' + formToSend.description + '</p>'

  try {
    const res = await axios.post("/videogames", formToSend);
    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export default postCustomGame;
