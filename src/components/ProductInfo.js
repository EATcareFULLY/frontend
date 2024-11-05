import React, {useState} from 'react';
import nutri_a from '../assets/nutri-score-a.svg';
import nutri_b from '../assets/nutri-score-b.svg';
import nutri_c from '../assets/nutri-score-c.svg';
import nutri_d from '../assets/nutri-score-d.svg';
import nutri_e from '../assets/nutri-score-e.svg';
import nutri_unknown from '../assets/nutri-score-unknown.svg';
import img_placeholder from '../assets/product-photo-placeholder.svg'
import {scanStore} from "../stores/ScanStore";
import {Dash, Plus} from "react-bootstrap-icons";
import {Button, FormControl, InputGroup} from "react-bootstrap";

const ProductInfo = ({ imageURL, id, name, brand, score }) => {

    const [quantityToAdd, setQuantityToAdd] = useState(1);

    const scoreImages = {
        'a': nutri_a,
        'b': nutri_b,
        'c': nutri_c,
        'd': nutri_d,
        'e': nutri_e,
        'unknown': nutri_unknown
    };

    const handleAddProduct = async () => {

        await scanStore.addScannedProductToPurchase(quantityToAdd);

    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 9999) {
            setQuantityToAdd(value);
        }
    };

    const handleIncrement = () => {
        if (quantityToAdd < 9999) {
            setQuantityToAdd(quantityToAdd + 1);
        }
    };

    const handleDecrement = () => {
        if (quantityToAdd > 1) {
            setQuantityToAdd(quantityToAdd - 1);
        }
    };

    return (
        <div className="row mb-3">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src={imageURL || img_placeholder} alt="Product-photo" className="img-fluid rounded"/>
            </div>
            <div className="col-md-6 text-start">
                <h1>{name}</h1>
                <h2>Brands: {brand}</h2>
                <h5>Barcode: {id}</h5>
                {score && <img src={scoreImages[score]} alt="nutri-score" className="d-block mt-3 mb-3"/>}
                <InputGroup className="mb-3">
                    <Button
                        className="btn btn-primary text-white"
                        onClick={handleDecrement}
                        data-testid="decrement-button"
                    >
                        <Dash/>
                    </Button>
                    <FormControl
                        type="number"
                        aria-label="Quantity"
                        value={quantityToAdd}
                        min="1"
                        max="9999"
                        onChange={(e) => handleQuantityChange(e)}
                        className="text-center"
                        data-testid="quantity-input"
                    />
                    <Button
                        className="btn btn-primary text-white"
                        onClick={handleIncrement}
                        data-testid="increment-button"
                    >
                        <Plus/>
                    </Button>
                </InputGroup>
                <InputGroup className="input-group mb-3">
                    <Button className="btn btn-primary text-white flex-fill" onClick={handleAddProduct}>
                        Add to purchased products
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
};

    export default ProductInfo;
