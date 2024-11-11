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
  // const baseURL = import.meta.env.VITE_BASE_URL
  try {
    const res = await axios.get(
      `${baseUrl}/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWJkNTdlYS1lNzU2LTQ3MGEtOTBiZS1iODMyMjI5NGY4ZDMiLCJqdGkiOiI3Yjk3NWJhYy0xNTQzLTRhNzAtYWNjNS04YzAzOGIyZDNjMzkiLCJlbWFpbCI6Im1hc2cxMzc3QGdtYWlsLmNvbSIsIlVpZCI6InJoNU1DUkRBTHV2Zk9Jd2RlamZtUnUyTVNrNWJPWnFWSkVwSEo2WDNMQjQ9RXM3ODg5OGQ5NjllZWY2ZWNhZDNjMjlhM2E2MjkyODBlNjg2Y2YwYzNmNWQ1YTg2YWZmM2NhMTIwMjBjOTIzYWRjNmM5MiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJSZWZlcmVlIiwiQWRtaW5pc3RyYXRvciIsIlN0dWRlbnQiXSwiZXhwIjoxNzMxMzUyODE0LCJpc3MiOiJTZXBlaHJBY2FkZW15IiwiYXVkIjoiU2VwZWhyQWNhZGVteSJ9.EiyEQksulDsSEoH5Yyq6CLq_Qf4Oyte6lljz4QKk0rw`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
