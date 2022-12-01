import axios from "axios";

const getSearch = async str => {
  try {
    const res = await axios.get(`/videogames/?name=${str}`);
    return res.data;
  } catch (error) {
    return []
  }
}
export default getSearch;