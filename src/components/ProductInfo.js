import React, {useState} from 'react';
import nutri_a from '../assets/nutri-score-a.png';
import nutri_b from '../assets/nutri-score-b.png';
import nutri_c from '../assets/nutri-score-c.png';
import nutri_d from '../assets/nutri-score-d.png';
import nutri_e from '../assets/nutri-score-e.png';
import nutri_unknown from '../assets/nutri-score-unknown.png';
import img_placeholder from '../assets/product-photo-placeholder.png'
import {scanStore} from "../stores/ScanStore";
import {Dash, Plus} from "react-bootstrap-icons";

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
        if (!isNaN(value) && value >= 1) {
            setQuantityToAdd(value);
        }
    };

    const handleIncrement = () => {
        setQuantityToAdd(quantityToAdd + 1);
    };

    const handleDecrement = () => {
        if (quantityToAdd > 1) {
            setQuantityToAdd(quantityToAdd - 1);
        }
    };

    return (
        <div className="row mb-3">
            <div className="col-md-6">
                <img src={imageURL || img_placeholder} alt="Product" className="img-fluid rounded" />
            </div>
            <div className="col-md-6 text-start">
                <h1>{name}</h1>
                <h2>Brands: {brand}</h2>
                <h5>Barcode: {id}</h5>
                {score && <img src={scoreImages[score]} alt="nutri-score" className="d-block mt-3 mb-3" />}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleDecrement}
                            data-testid="decrement-button"
                        >
                            <Dash/>
                        </button>
                    </div>
                    <input
                        type="number"
                        className="form-control input-number text-center"
                        placeholder="Quantity"
                        value={quantityToAdd}
                        min="1"
                        onChange={(e) => handleQuantityChange(e)}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleIncrement}
                            data-testid="increment-button"
                        >
                            <Plus/>
                        </button>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-secondary flex-fill" onClick={handleAddProduct}>
                        Add to purchased products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
