import instance from "../../interceptor";
export const createUser = async (userData) => {
  try {
    const response = await instance.post("/User/CreateUser", userData);
    return response.data;
  } catch (error) {
    console.error("ایجاد کاربر جدید با خطا مواجه شد", error);
    throw error;
  }
};
