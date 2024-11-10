// // import axios from "axios";
// // import { baseUrl } from "@config/baseURL";
// import instance from "../../interceptor";

// export const getTopCourses = async () => {
//   //const baseURL = import.meta.env.VITE_BASE_URL
//   try {
//     const res = await instance.get(
//       "/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query"
//     );
//     return res;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
import axios from "axios";
import { baseUrl } from "../../../../configs/baseURL";

export const getTopCourses = async () => {
  //const baseURL = import.meta.env.VITE_BASE_URL
  try {
    const res = await axios.get(
      `${baseUrl}/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
