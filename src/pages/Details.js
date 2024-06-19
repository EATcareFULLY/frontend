import React, {useEffect} from "react";
import {scanStore} from "../stores/ScanStore";
import { observer } from "mobx-react";

const Details= observer(() => {
    console.log("Details component rendering");

    useEffect(() => {

        async function fetchData () {
            await scanStore.getTestProduct();
        }

        fetchData();


    }, []);


    if (!scanStore.scannedProduct) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h2>{scanStore.scannedProductCode}</h2>
            <h2>{scanStore.scannedProduct.id}</h2>
            <h2>{scanStore.scannedProduct.name}</h2>
            <h2>{scanStore.scannedProduct.brand}</h2>
            <h2>{scanStore.scannedProduct.score}</h2>
            <img src={scanStore.scannedProduct.imageURL} alt="???"/>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {scanStore.scannedProduct.ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>


            <table>
                <thead>
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
    )
});
export default Details;