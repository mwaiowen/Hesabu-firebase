import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
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

  const fetchUpdateProducts = async () => {
    try {
      const q = query(transactionCollectionRef);
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
        "Error fetching and updating product transactions doc:",
        error.message
      );
    }
  };

  const checkNameExistence = async (name) => {
    const nameQuery = query(productsCollectionRef, where("name", "==", name));
    const nameSnapShot = await getDocs(nameQuery);
    return !nameSnapShot.empty;
  };

  const addTransaction = async ({ name, value, quantity, date }) => {
    try {
      const parsedQuantity = parseInt(quantity, 10);
      const parsedValue = parseInt(value, 10);

      const nameExists = await checkNameExistence(name);
      if (!nameExists) {
        throw new Error(`No product found with this name: ${name}`);
      }

      await addDoc(transactionCollectionRef, {
        userID,
        name,
        value: parsedValue,
        quantity: parsedQuantity,
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
        const updatedQuantity =
          parsedQuantity + (productSnapshot.docs[0].data().quantity || 0);
        const updatedValue =
          parsedValue + (productSnapshot.docs[0].data().value || 0);

        await updateDoc(doc(productsCollectionRef, productId), {
          quantity: updatedQuantity,
          value: updatedValue,
        });

        setProductQty(updatedQuantity);
        setProductValue(updatedValue);
      } else {
        throw new Error("Product not found after adding transaction");
      }
    } catch (error) {
      console.log("Error adding transaction", error.message);
    }
  };

  useEffect(() => {
    console.log("I got cleaned ");
    fetchUpdateProducts();
  }, []);

  // Return productQty as negative value directly
  const transactionProductQty = productQty ? -Math.abs(productQty) : 0;
  const transactionProductValue = productValue ? -Math.abs(productValue) : 0;

  return {
    addTransaction,
    transactionProductQty,
    transactionProductValue,
    productValue,
    productQty,
  };
};
