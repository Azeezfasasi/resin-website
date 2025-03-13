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

    const updateProduct = async (updatedProduct) => {
        try {
            const id = updatedProduct.get("_id");
            const response = await axios.put(`https://resin-backend.onrender.com/api/product/${id}`, updatedProduct, { // Corrected URL
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === response.data._id ? response.data : product
                )
            );
        } catch (err) {
            console.error("Error updating product:", err);
            setError(err);
        }
    };
      
      

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;