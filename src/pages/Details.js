import React, { useEffect } from "react";
import { scanStore } from "../stores/ScanStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";
import ProductInfo from "../components/ProductInfo";
import ProductTables from "../components/ProductTables";

const Details = observer(() => {
    console.log("Details component rendering");

    useEffect(() => {
        async function fetchData() {
            await scanStore.getScannedProduct();
        }

        fetchData();

        return () => {
            scanStore.resetScannedProduct();
        };
    }, []);

    if (!scanStore.scannedProduct) {
        return <Loading />;
    }

    if (scanStore.scannedProduct.id === 0) {
        return <ProductNotFound />;
    }


    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark" style={{ color: "white" }}>
                    <h2 className="text-center">Product's Details</h2>
                </div>
                <div className="card-body">
                    <ProductInfo
                        imageURL={scanStore.scannedProduct.imageURL}
                        id={scanStore.scannedProduct.id}
                        name={scanStore.scannedProduct.name}
                        brand={scanStore.scannedProduct.brand}
                        score={scanStore.scannedProduct.score}
                    />
                    <ProductTables
                        tags={scanStore.scannedProduct.tags}
                        allergens={scanStore.scannedProduct.allergens}
                        ingredients={scanStore.scannedProduct.ingredients}
                    />
                </div>
            </div>
        </div>
    );
});

export default Details;
