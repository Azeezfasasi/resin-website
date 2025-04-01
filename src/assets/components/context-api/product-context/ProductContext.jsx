import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
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
    }, []);

    // Create a new product with variants
    const addProduct = async (newProduct) => {
        try {
            const response = await axios.post(api, newProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProducts((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Error adding product:", err); // Log the full error
            if (err.response) {
                console.error("Backend error data:", err.response.data); 
            }
            setError("Failed to add product. Please try again.");
            return { error: err.response?.data?.message || "Failed to add product" };
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${api}/${id}`);
            setProducts((prev) => prev.filter((product) => product._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    // Update product details (including variants)
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

    // Add a variant to an existing product
    const addVariant = async (productId, newVariant) => {
        try {
            const response = await axios.put(`${api}/${productId}/add-variant`, newVariant, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setProducts((prev) => prev.map((p) => (p._id === productId ? response.data : p)));
        } catch (err) {
            setError(err);
        }
    };

    // Remove a variant from a product
    const removeVariant = async (productId, variantId) => {
        try {
            const response = await axios.put(`${api}/${productId}/remove-variant`, { variantId }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setProducts((prev) => prev.map((p) => (p._id === productId ? response.data : p)));
        } catch (err) {
            setError(err);
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            deleteProduct,
            updateProduct,
            addVariant,
            removeVariant,
            loading,
            error,
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
