// import {
//   collection,
//   onSnapshot,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import { useGetUserInfo } from "../user/useGetUserInfo";

// const useGetTheProducts = (catID, name) => {
//   const [products, setProducts] = useState([]);
//   const [productTotals, setProductTotals] = useState({ balance: 0.0 });
//   const productsCollectionRef = collection(db, "products");

//   const { userID } = useGetUserInfo();

//   const getProducts = async () => {
//     let unsubscribe;

//     try {
//       const q = query(
//         productsCollectionRef,
//         where("userID", "==", userID),
//         orderBy("createdAt")
//       );

//       console.log("Query:", q);

//       unsubscribe = onSnapshot(
//         q,
//         (snapshot) => {
//           let docs = [];
//           let totalProduct = 0;

//           snapshot.forEach((doc) => {
//             const data = doc.data();
//             const id = doc.id;

//             docs.push({ ...data, id });

//             if (
//               (!catID || data.catID === catID) &&
//               (!name || data.name == name)
//             ) {
//               totalProduct += Number(data.totalPrice);
//             }
//           });

//           setProducts(docs);
//           setProductTotals({ balance: totalProduct });
//         },
//         (error) => {
//           console.error("Error fetching productssssssssssss:", error);
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }

//     if (catID !== undefined && catID !== null) {
//       getProducts();
//     }

//     return () => unsubscribe();
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);
//   return { products, productTotals };
// };

// export default useGetTheProducts;
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
