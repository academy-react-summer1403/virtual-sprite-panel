import instance from "../../interceptor";

export const getUserDetailWithId = async (id) => {
  try {
    const res = await instance.get(`/User/UserDetails/${id}` );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};
