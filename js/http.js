const BASE_URL = "https://jsonplaceholder.typicode.com";

export const GET = async (endpoint) => {
  const res = await fetch(BASE_URL + endpoint);
  const data = await res.json();
  return data;
};
