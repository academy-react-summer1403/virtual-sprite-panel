import instance from "../../interceptor";

const DeleteUser = async (obj) => {
  try {
    const token = localStorage.getItem("token");

    const result = await instance.delete(`/User/DeleteUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: obj, // ارسال داده‌ها در متد DELETE
    });

    return result;
  } catch (error) {
    console.error("خطا در حذف کاربر:", error);
    throw error; // ارجاع خطا برای مدیریت در سطح بالاتر
  }
};

export { DeleteUser };
