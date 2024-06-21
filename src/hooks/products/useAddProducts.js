import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useAddProducts = () => {
  const productsCollectionRef = collection(db, "products");
  const { userID } = useGetUserInfo();

  const addProducts = async ({
    name,
    catID,
    defaultPrice,
    quantity,
    totalPrice,
  }) => {
    await addDoc(productsCollectionRef, {
      userID,
      name,
      catID,
      defaultPrice,
      quantity,
      totalPrice,
      createdAt: serverTimestamp(),
    });
  };
  return {
    addProducts,
  };
};
