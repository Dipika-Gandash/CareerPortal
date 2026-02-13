import api from "./axios";

export const fetchCurrentUser = async () => {
  try {
    const { data } = await api.get("/api/v1/user/me"); 
    return data.user || null;
  } catch (error) {
    console.log("No logged-in user", error);
    return null;
  }
};
