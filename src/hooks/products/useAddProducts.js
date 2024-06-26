//for subtraction

// import {
//   addDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   doc as firestoreDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { useState, useEffect } from "react";
// import { useGetUserInfo } from "../user/useGetUserInfo";

// export const useAddProducts = () => {
//   const [productBalances, setProductBalances] = useState({});
//   const [productQuantity, setProductQuantity] = useState({});
//   const { userID } = useGetUserInfo();

//   const productsCollectionRef = collection(db, "products");
//   const categoriesCollectionRef = collection(db, "categories");

//   // const fetchAndUpdateProductBalances = async () => {
//   //   try {
//   //     const q = query(productsCollectionRef);
//   //     const querySnapshot = await getDocs(q);

//   //     const updatedProductBalances = {};
//   //     const updatedProductQuantity = {};

//   //     querySnapshot.forEach((doc) => {
//   //       const docData = doc.data();
//   //       updatedProductBalances[doc.id] = Number(docData.totalPrice || 0);
//   //       updatedProductQuantity[doc.id] = parseInt(docData.quantity || 0); // Convert to number
//   //     });

//   //     setProductBalances(updatedProductBalances);
//   //     setProductQuantity(updatedProductQuantity);
//   //   } catch (error) {
//   //     console.error(
//   //       "Error fetching and updating product balances:",
//   //       error.message
//   //     );
//   //   }
//   // };

//   // Initial fetch of product balances on component mount

//   const fetchAndUpdateProductBalances = async () => {
//     try {
//       const q = query(productsCollectionRef);
//       const querySnapshot = await getDocs(q);

//       const updatedProductBalances = {};
//       const updatedProductQuantity = {};

//       querySnapshot.forEach((doc) => {
//         const docData = doc.data();
//         updatedProductBalances[doc.id] = Number(docData.totalPrice || 0);
//         updatedProductQuantity[doc.id] = parseInt(docData.quantity || 0); // Convert to number
//       });

//       setProductBalances(updatedProductBalances);
//       setProductQuantity(updatedProductQuantity);
//     } catch (error) {
//       console.error(
//         "Error fetching and updating product balances:",
//         error.message
//       );
//     }
//   };

//   useEffect(() => {
//     console.log("I got cleaned ");
//     fetchAndUpdateProductBalances();
//   }, []);

//   // Function to check if category exists
//   const checkCategoryExistence = async (catID) => {
//     const catQuery = query(
//       categoriesCollectionRef,
//       where("catID", "==", catID)
//     );

//     const catSnapshot = await getDocs(catQuery);
//     return !catSnapshot.empty;
//   };

//   // const addProducts = async ({ name, catID, defaultPrice, quantity }) => {
//   //   try {
//   //     const categoryExists = await checkCategoryExistence(catID);
//   //     if (!categoryExists) {
//   //       throw new Error("No category found with this ID");
//   //     }

//   //     const totalProductPrice = defaultPrice * quantity;

//   //     // Convert quantity to number explicitly
//   //     const parsedQuantity = parseInt(quantity, 10);

//   //     // Check if a product with the same name and catID exists
//   //     const q = query(
//   //       productsCollectionRef,
//   //       where("catID", "==", catID),
//   //       where("name", "==", name)
//   //     );
//   //     const querySnapshot = await getDocs(q);

//   //     if (!querySnapshot.empty) {
//   //       // if product already exists, update its totalPrice and quantity
//   //       const updatePromises = querySnapshot.docs.map(async (doc) => {
//   //         const existingDocRef = firestoreDoc(productsCollectionRef, doc.id);
//   //         const docData = doc.data();
//   //         const existingTotalPrice = Number(docData.totalPrice || 0);
//   //         const existingQuantity = parseInt(docData.quantity || 0);

//   //         const updatedTotalPrice = existingTotalPrice + totalProductPrice;
//   //         const updatedQuantity = existingQuantity + parsedQuantity;

//   //         await updateDoc(existingDocRef, {
//   //           totalPrice: updatedTotalPrice,
//   //           quantity: updatedQuantity,
//   //           updatedAt: serverTimestamp(),
//   //         });

//   //         return { id: doc.id, updatedTotalPrice, updatedQuantity };
//   //       });

//   //       await Promise.all(updatePromises);
//   //     } else {
//   //       // Product doesn't exist, add a new product document
//   //       const newTotalPrice = totalProductPrice;

//   //       await addDoc(productsCollectionRef, {
//   //         userID,
//   //         name,
//   //         catID,
//   //         defaultPrice,
//   //         quantity: parsedQuantity,
//   //         totalPrice: newTotalPrice,
//   //         createdAt: serverTimestamp(),
//   //       });
//   //     }

//   //     // Update product balances after updating or adding
//   //     fetchAndUpdateProductBalances();
//   //   } catch (error) {
//   //     console.error("Error adding product:", error.message);
//   //   }
//   // };

//   const addProducts = async ({ name, catID, defaultPrice, quantity }) => {
//     try {
//       const categoryExists = await checkCategoryExistence(catID);
//       if (!categoryExists) {
//         throw new Error("No category found with this ID");
//       }

//       const totalProductPrice = defaultPrice * quantity;

//       // Convert quantity to number explicitly
//       const parsedQuantity = parseInt(quantity, 10);

//       // Check if a product with the same name and catID exists
//       const q = query(
//         productsCollectionRef,
//         where("catID", "==", catID),
//         where("name", "==", name)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         // if product already exists, update its totalPrice and quantity
//         const updatePromises = querySnapshot.docs.map(async (doc) => {
//           const existingDocRef = firestoreDoc(productsCollectionRef, doc.id);
//           const docData = doc.data();
//           const existingTotalPrice = Number(docData.totalPrice || 0);
//           const existingQuantity = parseInt(docData.quantity || 0);

//           const updatedTotalPrice = existingTotalPrice + totalProductPrice;
//           const updatedQuantity = existingQuantity + parsedQuantity;

//           await updateDoc(existingDocRef, {
//             totalPrice: updatedTotalPrice,
//             quantity: updatedQuantity,
//             updatedAt: serverTimestamp(),
//           });

//           // Update local state for product quantity
//           setProductQuantity((prevProductQuantity) => ({
//             ...prevProductQuantity,
//             [doc.id]: updatedQuantity,
//           }));

//           return { id: doc.id, updatedTotalPrice, updatedQuantity };
//         });

//         await Promise.all(updatePromises);
//       } else {
//         // Product doesn't exist, add a new product document
//         const newTotalPrice = totalProductPrice;

//         const newDocRef = await addDoc(productsCollectionRef, {
//           userID,
//           name,
//           catID,
//           defaultPrice,
//           quantity: parsedQuantity,
//           totalPrice: newTotalPrice,
//           createdAt: serverTimestamp(),
//         });

//         // Update local state for product quantity
//         setProductQuantity((prevProductQuantity) => ({
//           ...prevProductQuantity,
//           [newDocRef.id]: parsedQuantity,
//         }));
//       }

//       // Update product balances after updating or adding
//       fetchAndUpdateProductBalances();
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//     }
//   };

//   return { addProducts, productBalances, productQuantity };
// };

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

  const fetchAndUpdateProductBalances = async () => {
    try {
      const q = query(productsCollectionRef);
      const querySnapshot = await getDocs(q);

      const updatedProductBalances = {};
      const updatedProductQuantity = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        updatedProductBalances[doc.id] = Number(docData.totalPrice || 0);
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

  useEffect(() => {
    console.log("I got cleaned up");
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
          const existingTotalPrice = Number(docData.totalPrice || 0);
          const existingQuantity = parseInt(docData.quantity || 0);

          const updatedTotalPrice = existingTotalPrice + totalProductPrice;
          const updatedQuantity = existingQuantity + parsedQuantity;

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
