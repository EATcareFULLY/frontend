import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { historyStore } from "../stores/HistoryStore";

const History = observer(() => {
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
            console.log("history",historyStore.history);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Purchase List</h1>
            {historyStore.history.length === 0 ? (
                <p>Loading...</p>

            ) : (
                <ul>

                    {historyStore.history.map((purchase, index) => (
                        <li key={index}>
                            <p>Username: {purchase.username}</p>
                            <p>Product Name: {purchase.product.name}</p>
                            <p>Brand: {purchase.product.brand}</p>
                            <p>Purchase Date: {new Date(purchase.purchaseDate).toLocaleString()}</p>
                            <p>Quantity: {purchase.quantity}</p>
                            <hr/>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
});

export default History;
