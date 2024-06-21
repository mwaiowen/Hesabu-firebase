import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  const categoriesCollectionRef = collection(db, "categories");
  const { userID } = useGetUserInfo();

  const getCategories = async () => {
    let unsubscribe;
    try {
      const queryCategories = query(
        categoriesCollectionRef,
        where("userID", "==", userID),

        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryCategories, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setCategories(docs);
      }); // listens for changes
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
};
