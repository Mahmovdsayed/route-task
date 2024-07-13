export const getData = async () => {
  const data = await fetch("/data.json");
  const response = await data.json();
  return response;
};
