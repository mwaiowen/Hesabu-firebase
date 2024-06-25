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

export const useAddProducts = () => {
  const [productBalances, setProductBalances] = useState({});
  const [productQuantity, setProductQuantity] = useState({});
  const { userID } = useGetUserInfo();

  const productsCollectionRef = collection(db, "products");
  const categoriesCollectionRef = collection(db, "categories");

  // Function to fetch and update product balances and quantities
  const fetchAndUpdateProductBalances = async () => {
    try {
      const q = query(productsCollectionRef);
      const querySnapshot = await getDocs(q);

      const updatedProductBalances = {};
      const updatedProductQuantity = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const totalPrice = docData.totalPrice || 0;
        const quantity = docData.quantity || 0;

        updatedProductBalances[doc.id] = totalPrice;
        updatedProductQuantity[doc.id] = quantity;
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

  // Initial fetch of product balances on component mount
  useEffect(() => {
    console.log("I got cleaned up");
    fetchAndUpdateProductBalances();
  }, []);

  // Function to check if category exists
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

      // Check if a product with the same name and catID exists
      const q = query(
        productsCollectionRef,
        where("catID", "==", catID),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);

      const totalProduct = defaultPrice * quantity;

      if (!querySnapshot.empty) {
        // If product already exists, update its totalPrice and quantity
        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const existingDocRef = firestoreDoc(productsCollectionRef, doc.id);
          const docData = doc.data();
          const updatedTotal = (docData.totalPrice || 0) + totalProduct;
          const updatedQuantity = (docData.quantity || 0) + totalQuantity; /// declare thisssssssssssssssssssssssssssssssssssssssssss

          await updateDoc(existingDocRef, {
            totalPrice: updatedTotal,
            quantity: updatedQuantity,
            updatedAt: serverTimestamp(),
          });

          return { updatedTotal, updatedQuantity };
        });

        await Promise.all(updatePromises);
      } else {
        // If product doesn't exist, add a new product document
        const newTotalPrice = totalProduct;
        const newTotalQuantity = quantity; // Use quantity directly

        await addDoc(productsCollectionRef, {
          userID,
          name,
          catID,
          defaultPrice,
          quantity: newTotalQuantity,
          totalPrice: newTotalPrice,
          createdAt: serverTimestamp(),
        });
      }

      // Update product balances after updating or adding
      fetchAndUpdateProductBalances();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return { addProducts, productBalances, productQuantity };
};
