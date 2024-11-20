import instance from "../../interceptor";

export const getTopCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(
      `${import.meta.env.VITE_BASE_URL}/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("پاسخ :", res.courseDtos);
    return res;
  } catch (error) {
    console.log("خطا:", error.message);   
    return [];
  }
};
