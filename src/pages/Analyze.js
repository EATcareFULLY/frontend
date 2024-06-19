import React from "react";
import '../index.css';
import '../App.css'
function Analyze() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold underline text-blue-500">
                Hello Tailwind CSS!
            </h1>
            <h1 className="custom-blue">
                This text should be blue if custom CSS works.
            </h1>
        </div>
    )
}

export default Analyze;