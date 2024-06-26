import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";
import { useEffect, useState } from "react";

export const useAddTransaction = () => {
  const [productValue, setProductValue] = useState({});
  const [productQty, setProductQty] = useState({});
  const { userID } = useGetUserInfo();

  const transactionCollectionRef = collection(db, "transactions");
  const productsCollectionRef = collection(db, "products");

  const fetchAndUpdateProducts = async () => {
    try {
      const q = query(productsCollectionRef);
      const querySnapshot = await getDocs(q);

      const updatedProductValue = {};
      const updatedProductQuantity = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        updatedProductValue[doc.id] = parseInt(docData.value || 0);
        updatedProductQuantity[doc.id] = parseInt(docData.quantity || 0);
      });

      setProductQty(updatedProductQuantity);
      setProductValue(updatedProductValue);
    } catch (error) {
      console.error(
        "Error fetching and updating product transactions:",
        error.message
      );
    }
  };

  const checkNameExistence = async (name) => {
    const nameQuery = query(productsCollectionRef, where("name", "==", name));
    const nameSnapShot = await getDocs(nameQuery);
    return !nameSnapShot.empty;
  };

  // const addTransaction = async ({ name, value, quantity, date }) => {
  //   try {
  //     const parsedQuantity = parseInt(quantity, 10);
  //     const parsedValue = parseInt(value, 10);

  //     const nameExists = await checkNameExistence(name);
  //     if (!nameExists) {
  //       throw new Error("No name found with that input");
  //     } else {
  //       await addDoc(transactionCollectionRef, {
  //         userID,
  //         name,
  //         quantity: parsedQuantity,
  //         value: parsedValue,
  //         date,
  //         createdAt: serverTimestamp(),
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding transaction:", error.message);
  //   }
  // };

  // const addTransaction = async ({ name, value, quantity, date }) => {
  //   try {
  //     const parsedQuantity = parseInt(quantity, 10);
  //     const parsedValue = parseInt(value, 10);

  //     const nameExists = await checkNameExistence(name);
  //     if (!nameExists) {
  //       throw new Error("No name found with that input");
  //     } else {
  //       // Add transaction to transactions collection
  //       await addDoc(transactionCollectionRef, {
  //         userID,
  //         name,
  //         quantity: parsedQuantity,
  //         value: parsedValue,
  //         date,
  //         createdAt: serverTimestamp(),
  //       });

  //       // Update product quantity in products collection
  //       const productQuery = query(
  //         productsCollectionRef,
  //         where("name", "==", name)
  //       );
  //       const productSnapshot = await getDocs(productQuery);
  //       if (!productSnapshot.empty) {
  //         const productId = productSnapshot.docs[0].id;
  //         const currentQuantity = productSnapshot.docs[0].data().quantity || 0;
  //         const newQuantity = currentQuantity - parsedQuantity;

  //         await db.doc(`products/${productId}`).update({
  //           quantity: newQuantity,
  //         });

  //         // Update local state for product quantity
  //         setProductQty((prevProductQty) => ({
  //           ...prevProductQty,
  //           [productId]: newQuantity,
  //         }));
  //       } else {
  //         throw new Error("Product not found");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error adding transaction:", error.message);
  //   }
  // };

  const addTransaction = async ({ name, value, quantity, date }) => {
    try {
      const parsedQuantity = parseInt(quantity, 10);
      const parsedValue = parseInt(value, 10);

      const nameExists = await checkNameExistence(name);
      if (!nameExists) {
        throw new Error("No product found with that name");
      }

      await addDoc(transactionCollectionRef, {
        userID,
        name,
        quantity: parsedQuantity,
        value: parsedValue,
        date,
        createdAt: serverTimestamp(),
      });

      const productQuery = query(
        productsCollectionRef,
        where("name", "==", name)
      );
      const productSnapshot = await getDocs(productQuery);

      if (!productSnapshot.empty) {
        const productId = productSnapshot.docs[0].id;
        const currentQuantity = productSnapshot.docs[0].data().quantity || 0;
        const newQuantity = currentQuantity - parsedQuantity;

        await updateDoc(doc(productsCollectionRef, productId), {
          quantity: newQuantity,
        });

        setProductQty((prevProductQty) => ({
          ...prevProductQty,
          [productId]: newQuantity,
        }));
      } else {
        throw new Error("Product not found after adding transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  useEffect(() => {
    console.log("I got cleaned ");
    fetchAndUpdateProducts();
  }, []);

  return {
    addTransaction,
    productQty,
    productValue,
  };
};
