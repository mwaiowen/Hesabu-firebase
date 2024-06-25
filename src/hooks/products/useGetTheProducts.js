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

export const useGetTheProducts = () => {
  const [products, setProducts] = useState([]);

  const productsCollectionRef = collection(db, "products");
  const { userID } = useGetUserInfo();

  const getProducts = async () => {
    let unsubscribe;
    try {
      const queryProducts = query(
        productsCollectionRef,
        where("userID", "==", userID),

        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryProducts, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setProducts(docs);
      }); // listens for changes
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getProducts();
  }, []);
  return { products };
};
