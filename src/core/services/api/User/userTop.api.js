import instance from "../../interceptor";

export const getTopUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const roleId = 1;

    let url = `${
      import.meta.env.VITE_BASE_URL
    }/User/UserMannage?PageNumber=5&RowsOfPage=5&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true`;

    if (roleId !== 1 || roleId !== 3 || roleId !== 5) {
      url += `&roleId=${roleId}`;
    }

    const res = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("پاسخ :", res.listUser);
    return res;
  } catch (error) {
    console.log("خطا:", error.message);
    return [];
  }
};
