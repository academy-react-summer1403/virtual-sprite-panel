import instance from "../../interceptor";

export const getCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(
      `${import.meta.env.VITE_BASE_URL}/Course/GetCreate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log("خطا:", error.message);   
    return [];
  }
};
