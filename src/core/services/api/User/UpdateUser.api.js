import instance from "../../interceptor";
const UpdateUser = async (obj) => {
  try {
    const token = localStorage.getItem("token");

    const result = await instance.put(
      `/User/UpdateUser`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    console.error("خطا", error);
  }
};
export {UpdateUser};


