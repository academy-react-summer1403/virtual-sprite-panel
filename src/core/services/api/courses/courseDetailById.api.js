import instance from "../../interceptor";

export const getCoursesDetail = async (id) => {
  try {
    const res = await instance.get(`/Course/${id}` );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};
export const courseEditApi = async (formdata) => {
  try {
    const res = await instance.put("/Course",formdata );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};

export const CourseReserveApi = async (courseId) => {
  try {
    const res = await instance.get(`/CourseReserve/${courseId}` );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};