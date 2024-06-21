import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useAddCategory = () => {
  const categoriesCollectionRef = collection(db, "categories");
  const { userID } = useGetUserInfo();

  const addCategory = async ({ catID, name }) => {
    await addDoc(categoriesCollectionRef, {
      userID,
      catID,
      name,
      createdAt: serverTimestamp(),
    });
  };
  return {
    addCategory,
  };
};
