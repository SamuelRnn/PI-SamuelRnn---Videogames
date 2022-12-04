import axios from "axios";

const postCustomGame = async (formToSend) => {
  if(Object.values(initialForm).flat().some(val => !val)) return {
    status: false,
    message: 'Please, fill all fields correctly'
  }
  if(isNaN(formToSend.released.join('')) || formToSend.released.join('').length !== 8) return {
    status: false,
    message: 'Date is not valid'
  }
  if(formToSend.name.length > 52) return {
    status: false,
    message: 'Max. length (52) exceeded for input "name"'
  }
  if(formToSend.name.length > 255) return {
    status: false,
    message: 'Max. length (255) exceeded for input "description"'
  }
  formToSend.released = [...formToSend.released].reverse().join("-");
  formToSend.rating = +formToSend.rating
  formToSend.genres = formToSend.genres.map(genre => +genre);
  try {
    const res = await axios.post("/videogames", formToSend);
    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export default postCustomGame;
