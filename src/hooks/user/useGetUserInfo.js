// export const useGetUserInfo = () => {
//   const { isAuth, userID } = JSON.parse(localStorage.getItem("auth"));
//   return { userID, isAuth };
// };

export const useGetUserInfo = () => {
  const authData = localStorage.getItem("auth");

  if (authData) {
    try {
      const { isAuth, userID } = JSON.parse(authData); //profilePhoto and name
      return { userID, isAuth };
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
  }

  return { userID: null, isAuth: false };
};
