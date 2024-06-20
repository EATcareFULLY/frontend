import React, {useEffect} from "react";
import {scanStore} from "../stores/ScanStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";

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
                <div className="card-header">
                    <h2 className="text-center">{scanStore.scannedProductCode}</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <img src={scanStore.scannedProduct.imageURL} alt="Product" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-8">
                            <h3>ID: {scanStore.scannedProduct.id}</h3>
                            <h3>Name: {scanStore.scannedProduct.name}</h3>
                            <h3>Brand: {scanStore.scannedProduct.brand}</h3>
                            <h3>Score: {scanStore.scannedProduct.score}</h3>
                        </div>
                    </div>
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
