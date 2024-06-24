// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { useGetUserInfo } from "../user/useGetUserInfo";

// export const useAddProducts = () => {
//   const productsCollectionRef = collection(db, "products");
//   const { userID } = useGetUserInfo();

//   const addProducts = async ({
//     name,
//     catID,
//     defaultPrice,
//     quantity,
//     totalPrice,
//   }) => {
//     await addDoc(productsCollectionRef, {
//       userID,
//       name,
//       catID,
//       defaultPrice,
//       quantity,
//       totalPrice,
//       createdAt: serverTimestamp(),
//     });
//   };
//   return {
//     addProducts,
//   };
// };

// import {
//   addDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   doc as firestoreDoc, // renamed to avoid conflict with the 'doc' function from firebase/firestore
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { useState } from "react"; // Import useState from React
// import { useGetUserInfo } from "../user/useGetUserInfo";

// export const useAddProducts = () => {
//   const [productTotals, setProductTotals] = useState({ balance: 0.0 });

//   const productsCollectionRef = collection(db, "products");
//   const { userID } = useGetUserInfo();

//   const addProducts = async ({ name, catID, defaultPrice, quantity }) => {
//     const q = query(
//       productsCollectionRef,
//       where("catID", "==", catID),
//       where("name", "==", name)
//     );
//     const querySnapshot = await getDocs(q);
//     let totalProduct = defaultPrice * quantity; // Initialize totalProduct here

//     if (!querySnapshot.empty) {
//       // If there's a matching document, update its totalPrice
//       querySnapshot.forEach(async (doc) => {
//         const existingDocRef = firestoreDoc(productsCollectionRef, doc.id);
//         await updateDoc(existingDocRef, {
//           totalPrice: totalProduct,
//           updatedAt: serverTimestamp(),
//         });
//       });
//     } else {
//       ///If no matching document, add a new one
//       await addDoc(productsCollectionRef, {
//         userID,
//         name,
//         catID,
//         defaultPrice,
//         quantity,
//         totalPrice: totalProduct,
//         createdAt: serverTimestamp(),
//       });
//     }

//     setProductTotals({ balance: totalProduct }); // Update productTotals after the operation
//   };

//   return {
//     addProducts,
//     productTotals,
//   };
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
import { useState } from "react";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useAddProducts = () => {
  const [productTotals, setProductTotals] = useState({ balance: 0.0 });

  const productsCollectionRef = collection(db, "products");
  const { userID } = useGetUserInfo();

  const addProducts = async ({ name, catID, defaultPrice, quantity }) => {
    const q = query(
      productsCollectionRef,
      where("catID", "==", catID),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(q);

    let totalProduct = defaultPrice * quantity;

    if (!querySnapshot.empty) {
      let cumulativeTotal = 0;

      querySnapshot.forEach(async (doc) => {
        const existingDocRef = firestoreDoc(productsCollectionRef, doc.id);
        const docData = doc.data();
        const currentTotal = docData.totalPrice || 0;
        cumulativeTotal += currentTotal;
        await updateDoc(existingDocRef, {
          totalPrice: currentTotal + totalProduct,
          updatedAt: serverTimestamp(),
        });
      });

      setProductTotals({ balance: cumulativeTotal + totalProduct });
    } else {
      await addDoc(productsCollectionRef, {
        userID,
        name,
        catID,
        defaultPrice,
        quantity,
        totalPrice: totalProduct,
        createdAt: serverTimestamp(),
      });

      setProductTotals({ balance: totalProduct });
    }
  };

  return {
    addProducts,
    productTotals,
  };
};
