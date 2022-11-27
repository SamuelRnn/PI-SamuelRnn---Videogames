import axios from 'axios';
const getGameDetail = async (id) => {
  const fetchedData = await axios.get(`http://localhost:3001/videogames/${id}`)
  return fetchedData.data
}

export default getGameDetail;