import axios from "axios";

const getSearch = async str => {
  const res = await axios.get(`http://localhost:3001/videogames/?name=${str}`);
  return res.data;
}
export default getSearch;