import instance from "../../interceptor";

const createCourse = async (formData) => {
  try {
    const response = await instance.post("/api/Course", formData);
    return response.data;
  } catch (error) {
    console.error("ایجاد دوره جدید با خطا مواجه شد", error);
    throw error;
  }
};
export {createCourse};