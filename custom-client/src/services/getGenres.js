import axios from "axios";

const getGenres = async () => {
  const res = await axios.get('/genres');
  return res.data;
};

export default getGenres;
