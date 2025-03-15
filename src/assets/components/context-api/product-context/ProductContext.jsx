import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api = "https://resin-backend.onrender.com/api/product";

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(api);
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [api]);

    const addProduct = async (newProduct) => {
        try {
            const response = await axios.post(api, newProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const updatedProducts = await axios.get(api);
            setProducts(updatedProducts.data);
        } catch (err) {
            setError(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${api}/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    const updateProduct = async (formData) => {
        try {
            const response = await axios.put(`${api}/${formData.get("_id")}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProducts((prev) =>
                prev.map((p) => (p._id === formData.get("_id") ? response.data : p))
            );
            return response.data;
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product. Please try again.");
        }
    };
    
    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;