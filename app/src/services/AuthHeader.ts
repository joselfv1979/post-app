export const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user") as string).token;
  return {
    "Content-Type": "application/json",
    authorization: `bearer ${token}`,
  };
};
