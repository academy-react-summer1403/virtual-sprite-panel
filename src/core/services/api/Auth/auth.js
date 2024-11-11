import http from '../../interceptor';
export const loginAPI = async (user) => {
  try {
    const response = await http.post("/sign/login", user);
    return response;
  } catch (error) {
    return false;
  }
};
