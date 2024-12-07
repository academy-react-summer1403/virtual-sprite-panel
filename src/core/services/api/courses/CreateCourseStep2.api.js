import instance from "../../interceptor";

export const createCourse = async (formData) => {
  try {
    const response = await instance.post("/Course", formData);
    return response.data;
  } catch (error) {
    console.error("ایجاد دوره جدید با خطا مواجه شد", error);
    throw error;
  }
};
export const selectImg = async (formData) => {
  try {
    const response = await instance.post("/Course/SetNewImageForCourse", formData);
    return response.data;
  } catch (error) {
    console.error("ایجاد عکس  جدید با خطا مواجه شد", error);
    throw error;
  }
};

