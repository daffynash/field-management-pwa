import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [fields, setFields] = useState([]);
  const [stock, setStock] = useState({ squareBales: 0, roundBales: 0 }); // αρχικά κενό ή default

  // Firestore listener για τα Fields
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Fields"), (snapshot) => {
      const fieldsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFields(fieldsData);
    });

    return () => unsubscribe();
  }, []);

  // Προαιρετικά: listener για stock αν υπάρχει collection στο Firestore
  // useEffect(() => {
  //   const unsubscribeStock = onSnapshot(collection(db, "Stock"), (snapshot) => {
  //     const stockData = snapshot.docs[0]?.data();
  //     if (stockData) setStock(stockData);
  //   });
  //   return () => unsubscribeStock();
  // }, []);

  return <Layout fields={fields} setFields={setFields} stock={stock} />;
}

export default App;

