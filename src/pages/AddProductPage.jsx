import { useState } from "react";
import api from "../services/api";

function AddProductPage() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const addProduct = () => {
        api.post("/product", {
            name: name,
            price: parseFloat(price)
        })
            .then(() => {
                alert("Product Added Successfully");
                setName("");
                setPrice("");
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Add Product</h2>

            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <br /><br />

            <button onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
}

export default AddProductPage;