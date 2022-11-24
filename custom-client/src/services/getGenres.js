import axios from "axios";
const api_base_url = "http://localhost:3001";

const getGenres = async () => {
  const res = await axios.get(`${api_base_url}/genres`);
  return res.data;
};

export default getGenres;
