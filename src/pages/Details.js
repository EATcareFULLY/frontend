import React from "react";
import {scanStore} from "../stores/ScanStore";

const Details= () => {

    return (
        <div>
            <h2>{scanStore.productCode}</h2>
        </div>
    )
}
export default Details;