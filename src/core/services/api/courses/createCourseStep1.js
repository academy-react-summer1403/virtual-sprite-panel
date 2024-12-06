import instance from "../../interceptor";

export const getCourses = async (params) => {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(
      `/Course/GetCreate`,
      {
        params: params,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log("خطا در دریافت اطلاعات دوره ها:", error.message);   
    return [];
  }
};
