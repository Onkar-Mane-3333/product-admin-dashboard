import api from "./api";

export async function getProducts(limit,skip) {
  const response = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
}

export async function getProductsBySearch(search){
  const response = await api.get(
  `/products/search?q=${search}`
);

return response.data;
}

export async function getCategories(){
  const response = await api.get(
  `/products/categories`
  );
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await api.get(
    `/products/category/${category}`
  );
  return response.data;
}