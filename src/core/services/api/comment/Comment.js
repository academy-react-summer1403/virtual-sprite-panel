import instance from "../../interceptor";

export const getCommentCourses = async (courseId) => {
  try {
    const res = await instance.get(
    `/Course/GetCourseCommnets/${courseId}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCommentManeger = async () => {
  try {
    const result = await instance.get(
       `/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate`)
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

