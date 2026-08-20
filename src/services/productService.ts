import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebaseConfig";
import type { Product } from "../types/Product";

export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Product[];

  return products;
};
