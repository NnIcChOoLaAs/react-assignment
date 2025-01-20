import axios from "axios";

const BASE_URL = "https://swapi.dev/api";

export const getAllPeople = async () => {
  let allPeople = [];
  let nextUrl = `${BASE_URL}/people/`;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    allPeople = [...allPeople, ...response.data.results];
    nextUrl = response.data.next;
  }

  return allPeople;
};

export const getPlanet = async (planetId) => {
  const response = await axios.get(`${BASE_URL}/planets/${planetId}`);
  return response.data;
};
