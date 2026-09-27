import api from "./api";

export async function loginUser(username, password) {
    // SEND data to server
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  // GET response from server
  return response.data;
}

