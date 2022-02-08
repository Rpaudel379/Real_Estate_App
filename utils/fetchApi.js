import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "5e99c4843cmsh22e185dc4d2f95ap193417jsn6644cb74c5c0",
    },
  });

  return data;
};
