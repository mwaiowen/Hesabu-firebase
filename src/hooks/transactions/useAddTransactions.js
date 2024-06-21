import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";

export const useAddProducts = () => {
  const { userID } = useGetUserInfo();

  async function makeTransaction(name, quantity) {
    const transaction = db.runTransaction(async (transaction) => {
      // Step 1: Get the product document
      const productRef = db
        .collection("products")
        .where("name", "==", name)
        .limit(1);

      const productSnapshot = await transaction.get(productRef);

      if (productSnapshot.empty) {
        throw new Error("Product not found.");
      }

      // Step 2: Update the product total
      const productDoc = productSnapshot.docs[0];
      const productData = productDoc.data();
      const currentTotal = productData.total;
      const newTotal = currentTotal - quantity;

      if (newTotal < 0) {
        throw new Error("Insufficient quantity in stock.");
      }

      transaction.update(productRef, { total: newTotal });

      // Step 3: Add transaction record
      const transactionRef = db.collection("transactions").doc();
      transaction.set(transactionRef, {
        userID,
        name: name,
        quantity: quantity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      return newTotal;
    });

    return transaction;
  }
};
