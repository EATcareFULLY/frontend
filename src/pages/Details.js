import React, { useEffect } from "react";
import { scanStore } from "../stores/ScanStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";
import ProductInfo from "../components/ProductInfo";
import ProductTables from "../components/ProductTables";
import {Card, CardBody, Container} from "react-bootstrap";

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

    if (scanStore.scannedProduct.id === "0") {
        return <ProductNotFound />;
    }


    return (
        <Container className="mt-4">
            <Card>
                <CardBody>
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
                </CardBody>
            </Card>
        </Container>
    );
});

export default Details;
