import axios from "axios";
const api_base_url = "http://localhost:3001";

const getGames = async () => {
  const storedData = window.sessionStorage.getItem('games')
  if(storedData){
    return JSON.parse(storedData)
  }
  const fetchedData = await axios.get(`${api_base_url}/videogames`);
  window.sessionStorage.setItem('games', JSON.stringify(fetchedData.data))
  return fetchedData.data
};
export default getGames;
