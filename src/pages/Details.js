import React, { useEffect } from "react";
import { scanStore } from "../stores/ScanStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";
import ProductNotFound from "../components/ProductNotFound";
import ProductInfo from "../components/ProductInfo";
import ProductTables from "../components/ProductTables";
import {Button, Card, CardBody, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";

const Details = observer(() => {
    console.log("Details component rendering");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await scanStore.getScannedProduct();
        }

        fetchData();

        return () => {
            scanStore.resetScannedProduct();
        };
    }, []);

    const handleBack = () => {
        navigate("/Scan");
    }

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
            <div className="d-flex align-items-center justify-content-center">
                <Button
                className="mt-3 d-flex align-items-center justify-content-center gap-2"
                onClick={handleBack}
                >
                <BiArrowBack size={20}/>
                <span>Scan another product</span>
            </Button>
            </div>
        </Container>
    );
});

export default Details;
