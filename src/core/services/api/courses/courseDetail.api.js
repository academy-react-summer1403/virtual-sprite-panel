import instance from "../../interceptor";

export const getCoursesDetail = async (id) => {
  try {
    const res = await instance.get(`/User/UserDetails/:UserId=${id}` );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};
