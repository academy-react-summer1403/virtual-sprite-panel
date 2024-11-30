import instance from "../../interceptor";

export const getCommentCourses = async (TeacherId) => {
  try {
    const res = await instance.get(`/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&Query=&Accept=<boolean>&TeacherId=${TeacherId}&userId=<long>` );
    return res;
  } catch (error) {
    console.log( error); 
    return [];
  }
};