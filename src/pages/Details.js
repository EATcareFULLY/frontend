import React, {useEffect} from "react";
import {scanStore} from "../stores/ScanStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";
import ProductInfo from "../components/ProductInfo";

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
        return <Loading/>;
    }

    if (scanStore.scannedProduct && scanStore.scannedProduct.id===0) {
        return <ProductNotFound/>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-dark" style={{ color: 'white' }}>
                    <h2 className="text-center">Products's Details</h2>
                </div>
                <div className="card-body ">
                    <ProductInfo
                        imageURL={scanStore.scannedProduct.imageURL}
                        id={scanStore.scannedProduct.id}
                        name={scanStore.scannedProduct.name}
                        brand={scanStore.scannedProduct.brand}
                        score={scanStore.scannedProduct.score}
                    />
                    {scanStore.scannedProduct.ingredients && scanStore.scannedProduct.ingredients.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Content</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scanStore.scannedProduct.ingredients.map((ingredient) => (
                                    <tr key={ingredient.id}>
                                        <td>{ingredient.name}</td>
                                        <td>{ingredient.content}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {scanStore.scannedProduct.tags && scanStore.scannedProduct.tags.length > 0 && (
                        <div className="table-responsive mt-4">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Tag</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scanStore.scannedProduct.tags.map((tag) => (
                                    <tr key={tag.id}>
                                        <td>{tag.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {scanStore.scannedProduct.allergens && scanStore.scannedProduct.allergens.length > 0 && (
                        <div className="table-responsive mt-4">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Allergen</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scanStore.scannedProduct.allergens.map((allergen) => (
                                    <tr key={allergen.id}>
                                        <td>{allergen.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Details;
