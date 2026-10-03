import api from "./api";

export async function getProducts(limit,skip) {
  const response = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
}