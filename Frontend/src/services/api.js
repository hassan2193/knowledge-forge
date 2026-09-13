import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getArticles = async () => {
  const response = await api.get("/articles");
  return response.data;
};

export const importDocs = async (source) => {
  const response = await api.post("/import", {
    source,
  });

  return response.data;
};

export default api;