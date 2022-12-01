import axios from 'axios';
const getGameDetail = async (id) => {
  const fetchedData = await axios.get(`/videogames/${id}`)
  return fetchedData.data
}

export default getGameDetail;