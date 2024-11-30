import instance from "../../interceptor";

export const getTopUsers = async (RowsOfPage) => {
  try {
    const token = localStorage.getItem("token");
    // const roleId = 1;

    // let url = `${
    //   import.meta.env.VITE_BASE_URL
    // }/User/UserMannage?PageNumber=5&RowsOfPage=5&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true`;

    // if (roleId !== 1 || roleId !== 3 || roleId !== 5) {
    //   url += `&roleId=${roleId}`;
    // }

    // const res = await instance.get(url, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    const res = await instance.get(
      `/User/UserMannage`,
      {
        params: {
          PageNumber: 1,
          RowsOfPage: RowsOfPage ? RowsOfPage : 100,
          SortingCol: "DESC",
          SortType: "InsertDate",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("پاسخ api  :", res);
    return res;
  } catch (error) {
    console.log("خطا:", error.message);
    return [];
  }
};
