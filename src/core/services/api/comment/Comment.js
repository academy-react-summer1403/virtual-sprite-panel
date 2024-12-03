import instance from "../../interceptor";

export const getCommentCourses = async (TeacherId, userId) => {
  try {
    const res = await instance.get(
      `/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&Query=&Accept=true&TeacherId=${TeacherId}&userId=${userId}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};
