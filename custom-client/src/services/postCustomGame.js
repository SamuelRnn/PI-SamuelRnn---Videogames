import axios from "axios";

const postCustomGame = async (formToSend) => {
  if(Object.values(formToSend).slice(0,-1).flat().some(val => !val)) return {
    status: false,
    message: 'Please, fill all fields correctly'
  }
  if(isNaN(formToSend.rating) || formToSend.rating.length !== 4) return {
    status: false,
    message: 'Rating provided is not valid'
  }
  if(isNaN(formToSend.released.join('')) || formToSend.released.join('').length !== 8) return {
    status: false,
    message: 'Date provided is not valid'
  }
  if(formToSend.name.length > 52) return {
    status: false,
    message: 'Max. length (52) exceeded for input "name"'
  }
  if(formToSend.name.length > 255) return {
    status: false,
    message: 'Max. length (255) exceeded for input "description"'
  }
  if(formToSend.background_image){
    if(
      formToSend.background_image.split('.').pop() !== 'jpg' &&
      formToSend.background_image.split('.').pop() !== 'jpeg' &&
      formToSend.background_image.split('.').pop() !== 'webp' &&
      formToSend.background_image.split('.').pop() !== 'png'
      ){
        return {
          status: false,
          message: 'File format invalid'
        }
    }
  }
  formToSend.released = [...formToSend.released].reverse().join("-");
  formToSend.rating = +formToSend.rating
  formToSend.genres = formToSend.genres.map(genre => +genre);
  
  try {
    formToSend.background_image = await postImg()
  } catch (error) {
    return error
  }
  try {
    const res = await axios.post("/videogames", formToSend);
    return res.data;
  } catch (error) {
    return error.response.data
  }
};

const postImg = async () => {
  const key = import.meta.env.VITE_API_KEY;
  const file = document.getElementById('bg_file').files[0];

  const formData = new FormData();
  formData.append('media', file)
  formData.append('key', key)

  const res = await axios.post('https://thumbsnap.com/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if(!res.data.success) {
    throw {
      status: false,
      message: res.data.error.message
    }
  }
  return res.data.media
}
export default postCustomGame;
