// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import { useGetUserInfo } from "../user/useGetUserInfo";

// export const useGetProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [productTotals, setProductTotals] = useState({
//     balance: 0.0,
//   });

//   const productsCollectionRef = collection(db, "products");
//   const { userID } = useGetUserInfo();

//   const getProducts = async () => {
//     let unsubscribe;
//     try {
//       const queryProducts = query(
//         productsCollectionRef,
//         where("userID", "==", userID),

//         orderBy("createdAt")
//       );
//       unsubscribe = onSnapshot(queryProducts, (snapshot) => {
//         let docs = [];
//         let totalProduct = 0;
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           const id = doc.id;

//           docs.push({ ...data, id });
//           if (data.catID === catID) {
//             totalProduct += Number(data.total);
//           }
//         });
//         setProducts(docs);
//       }); // listens for changes
//     } catch (error) {
//       console.log(error);
//     }
//     return () => unsubscribe();
//   };
//   useEffect(() => {
//     getProducts();
//   }, []);
//   return { products };
// };

//SAMPLE 2 WORKS
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import { useGetUserInfo } from "../user/useGetUserInfo";

// export const useGetProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [productTotals, setProductTotals] = useState({
//     balance: 0.0,
//   });

//   const productsCollectionRef = collection(db, "products");
//   const { userID } = useGetUserInfo();

//   const getProducts = async () => {
//     let unsubscribe;
//     try {
//       const queryProducts = query(
//         productsCollectionRef,
//         where("userID", "==", userID),
//         orderBy("createdAt")
//       );
//       unsubscribe = onSnapshot(queryProducts, (snapshot) => {
//         let docs = [];
//         let totalProduct = 0; // Initialize totalProduct to 0
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           const id = doc.id;

//           docs.push({ ...data, id });
//           if (data.catID === catID) {
//             totalProduct += Number(data.totalPrice);
//           }
//         });
//         setProducts(docs);
//         setProductTotals({ balance: totalProduct });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     return () => unsubscribe();
//   };

//   useEffect(() => {
//     getProducts();
//   }, []); // Run once on mount

//   return { products, productTotals };
// };

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

export const useGetProducts = (catID) => {
  const [products, setProducts] = useState([]);
  const [productTotals, setProductTotals] = useState({
    balance: 0.0,
  });

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
        let totalProduct = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
          if (data.catID === catID) {
            totalProduct += Number(data.totalPrice);
          }
        });
        setProducts(docs);
        setProductTotals({ balance: totalProduct });
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    if (catID !== undefined && catID !== null) {
      getProducts();
    }
  }, [catID]); // Run whenever catID changes

  return { products, productTotals };
};
