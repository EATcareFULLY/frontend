import React from "react";

const ProductTables =({ tags, allergens, ingredients }) => {
    const renderTags = () => {
        if (!tags || tags.length === 0) {
            return <p>No tags found.</p>;
        }

        return (
            <table className="table table-bordered table-striped rounded">
                <thead className="table-secondary">
                <tr>
                    <th>Tag</th>
                </tr>
                </thead>
                <tbody>
                {tags.map((tag) => (
                    <tr key={tag.id}>
                        <td>{tag.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderAllergens = () => {
        if (!allergens || allergens.length === 0) {
            return <p>No allergens found.</p>;
        }

        return (
            <table className="table table-bordered table-striped rounded">
                <thead className="table-secondary">
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
            </table>
        );
    };

    const renderIngredients = () => {
        if (!ingredients || ingredients.length === 0) {
            return <p>No ingredients found.</p>;
        }

        return (
            <table className="table table-bordered table-striped rounded">
                <thead className="table-secondary">
                <tr>
                    <th>Ingredient</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.content}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
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
