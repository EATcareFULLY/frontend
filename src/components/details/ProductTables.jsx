import React from "react";
import { Table } from "react-bootstrap";
import { FaLeaf, FaSeedling, FaRecycle } from "react-icons/fa";
import { GiPalmTree} from "react-icons/gi";
import { LuWheatOff } from "react-icons/lu";

const ProductTables = ({ tags, allergens, ingredients }) => {
    const tagIcons = {
        "Contains palm oil": <GiPalmTree size={20} data-testid="GiPalmTree" />,
        "Gluten free": <LuWheatOff size={20} data-testid="LuWheatOff" />,
        "Eco packaging": <FaRecycle size={20} data-testid="FaRecycle" />,
        "Vegan": <FaSeedling size={20} data-testid="FaSeedling" />,
        "Vegetarian": <FaLeaf size={20} data-testid="FaLeaf" />,
    };

    const renderTags = () => {
        if (!tags || tags.length === 0) {
            return <p>No tags found.</p>;
        }

        return (
            <Table bordered striped>
                <thead className="table-primary">
                <tr>
                    <th>Tag</th>
                </tr>
                </thead>
                <tbody>
                {tags.map((tag) => (
                    <tr key={tag.id}>
                        <td className="d-flex justify-content-center align-items-center gap-2">
                            {tag.name} {tagIcons[tag.name] || null}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };

    const renderAllergens = () => {
        if (!allergens || allergens.length === 0) {
            return <p>No allergens found.</p>;
        }

        return (
            <Table bordered striped>
                <thead className="table-primary text-white">
                <tr>
                    <th>Allergen</th>
                </tr>
                </thead>
                <tbody>
                {allergens.map((allergen) => (
                    <tr key={allergen.id}>
                        <td>{allergen.name}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };

    const renderIngredients = () => {
        if (!ingredients || ingredients.length === 0) {
            return <p>No ingredients found.</p>;
        }

        return (
            <Table bordered striped>
                <thead className="table-primary text-white">
                <tr>
                    <th>Ingredient</th>
                    <th>Content [%]</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.content.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="table-responsive mt-4">
                        <h4>Tags</h4>
                        {renderTags()}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="table-responsive mt-4">
                        <h4>Allergens</h4>
                        {renderAllergens()}
                    </div>
                </div>
            </div>
            <div className="table-responsive mt-4">
                <h3>Ingredients</h3>
                {renderIngredients()}
            </div>
        </div>
    );
};

export default ProductTables;
