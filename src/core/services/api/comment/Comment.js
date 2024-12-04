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

export const getCommentManeger = async (userId) => {
  try {
    const result = await instance.get(
      `/Course/CommentManagmentTeacher?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&Query=&Accept=true&userId=${userId}`
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
