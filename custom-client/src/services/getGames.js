import axios from "axios";

const getGames = async () => {
  const storedData = window.sessionStorage.getItem("games");
  if (storedData) {
    return JSON.parse(storedData);
  }
  const fetchedData = await axios.get('/videogames');
  try {
    window.sessionStorage.setItem("games", JSON.stringify(fetchedData.data));
  } catch (error) {
    alert(error);
  }
  return fetchedData.data;
};
export default getGames;
