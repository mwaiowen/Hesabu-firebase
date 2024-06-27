import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc as firestoreDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useGetUserInfo } from "../user/useGetUserInfo";
import { useAddTransaction } from "../transactions/useAddTransactions";

export const useAddProducts = () => {
  const [productBalances, setProductBalances] = useState({});
  const [productQuantity, setProductQuantity] = useState({});

  const { userID } = useGetUserInfo();
  const {
    productQty: transactionProductQty,
    productValue: transactionProductValue,
  } = useAddTransaction();

  const productsCollectionRef = collection(db, "products");
  const categoriesCollectionRef = collection(db, "categories");
  const transactionCollectionRef = collection(db, "transactions");

  const fetchAndUpdateProductBalances = async () => {
    try {
      const q = query(productsCollectionRef);
      const querySnapshot = await getDocs(q);

      const updatedProductBalances = {};
      const updatedProductQuantity = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        updatedProductBalances[doc.id] = parseInt(docData.totalPrice || 0);
        updatedProductQuantity[doc.id] = parseInt(docData.quantity || 0);
      });

      setProductBalances(updatedProductBalances);
      setProductQuantity(updatedProductQuantity);
    } catch (error) {
      console.error(
        "Error fetching and updating product balances:",
        error.message
      );
    }
  };
  const fetchFromTransactions = async () => {
    try {
      const w = query(transactionCollectionRef);
      const querySnapshot = await getDocs(w);

      const updatedProductValue = {};
      const updatedProductQty = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        updatedProductValue[doc.id] = parseInt(docData.value || 0);
        updatedProductQty[doc.id] = parseInt(docData.quantity || 0);
      });
    } catch (error) {
      console.error("Error fetching the transactions");
    }
  };

  useEffect(() => {
    console.log("I got cleaned up");
    fetchFromTransactions();
    fetchAndUpdateProductBalances();
  }, []);

  const checkCategoryExistence = async (catID) => {
    const catQuery = query(
      categoriesCollectionRef,
      where("catID", "==", catID)
    );

    const catSnapshot = await getDocs(catQuery);
    return !catSnapshot.empty;
  };

  const addProducts = async ({ name, catID, defaultPrice, quantity }) => {
    try {
      const categoryExists = await checkCategoryExistence(catID);
      if (!categoryExists) {
        throw new Error("No category found with this ID");
      }

      const totalProductPrice = defaultPrice * quantity;
      const parsedQuantity = parseInt(quantity, 10);

      const q = query(
        productsCollectionRef,
        where("catID", "==", catID),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const existingDocRef = firestoreDoc(db, `products/${doc.id}`);
          const docData = doc.data();
          const existingTotalPrice = parseInt(docData.totalPrice || 0);
          const existingQuantity = parseInt(docData.quantity || 0);

          const updatedTotalPrice =
            parseInt(existingTotalPrice, 10) + parseInt(totalProductPrice, 10);
          const updatedQuantity =
            parseInt(existingQuantity, 10) + parseInt(parsedQuantity, 10);

          await updateDoc(existingDocRef, {
            totalPrice: updatedTotalPrice,
            quantity: updatedQuantity,
            updatedAt: serverTimestamp(),
          });

          setProductQuantity((prevProductQuantity) => ({
            ...prevProductQuantity,
            [doc.id]: updatedQuantity,
          }));

          return { id: doc.id, updatedTotalPrice, updatedQuantity };
        });

        await Promise.all(updatePromises);
      } else {
        const newTotalPrice = totalProductPrice;

        const newDocRef = await addDoc(productsCollectionRef, {
          userID,
          name,
          catID,
          defaultPrice,
          quantity: parsedQuantity,
          totalPrice: newTotalPrice,
          createdAt: serverTimestamp(),
        });

        setProductQuantity((prevProductQuantity) => ({
          ...prevProductQuantity,
          [newDocRef.id]: parsedQuantity,
        }));
      }

      fetchAndUpdateProductBalances();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return { addProducts, productBalances, productQuantity };
};
