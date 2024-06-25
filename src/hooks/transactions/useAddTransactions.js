import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({ name, value, quantity, date }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      name,
      quantity,
      value,
      date,
      createdAt: serverTimestamp(),
    });
  };
  return {
    addTransaction,
  };
};
