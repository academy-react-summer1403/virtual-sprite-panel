import instance from "../../interceptor";

export const getTopUsers = async (params) => {
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
        params: params,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("پاسخ api  :", res);
    // console.log("پاسخ res.roles  :", res.roles);
    // console.log("پاسخ res.listUser  :", res.listUser);

    return res;
  } catch (error) {
    console.log("خطا:", error.message);
    return [];
  }
};
