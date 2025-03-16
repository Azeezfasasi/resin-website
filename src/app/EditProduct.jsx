import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
import AccountHeader from "../assets/components/account-components/AccountHeader";
import MyAccountMenu from "../assets/components/account-components/MyAccountMenu";
import { Helmet } from "react-helmet";
import MobileFooter from "../assets/components/home-components/MobileFooter";
import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";

function EditProduct() {
    const { products, updateProduct, loading: productsLoading, error: productsError } = useContext(ProductContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        category: "",
        shortDescription: "",
        longDescription: "",
        price: "",
        images: [],
    });
    // const [tempImage, setTempImage] = useState(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tempImages, setTempImages] = useState([]);
    const [newImages, setNewImages] = useState([]); 

    useEffect(() => {
        if (productsLoading) return;
        if (productsError) {
            console.error("Error loading products", productsError);
            alert("Error loading products");
            return;
        }

        const product = products.find((p) => String(p._id) === id);
        if (product) {
            setProductData({
                name: product.name || '',
                category: product.category || '',
                shortDescription: product.shortDescription || '',
                longDescription: product.longDescription || '',
                price: product.price || '',
                images: product.images || [], // Set images from product
            });

            setTempImages(product.images || []);
        } else {
            alert("Product not found");
            navigate("/app/product", { replace: true });
            window.location.reload();
        }
    }, [id, products, navigate, productsLoading, productsError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        setTempImages(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
    
        const formData = new FormData();
        formData.append("_id", id);
        formData.append("name", productData.name);
        formData.append("category", productData.category);
        formData.append("shortDescription", productData.shortDescription);
        formData.append("longDescription", productData.longDescription);
        formData.append("price", productData.price);
    
        newImages.forEach((file) => {
            formData.append("images", file);
        });
    
        try {
            await updateProduct(formData);
            alert("Product updated successfully!");
            navigate("/app/product");
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Error updating product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (productsLoading) {
        return <p className="text-center text-lg font-semibold">Loading...</p>;
    }

return (
    <>
    <Helmet>
        <title>Edit Product - Resin By Saidat</title>
    </Helmet>
    <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/5">
            <MyAccountMenu />
        </div>
        <div className="md:w-4/5 p-6">
            <AccountHeader />
            <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input type="text" name="name" value={productData.name} onChange={handleInputChange} required className="w-full border rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Short Description</label>
                    <textarea name="shortDescription" value={productData.shortDescription} onChange={handleInputChange} required className="w-full border rounded-lg p-2"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Long Description</label>
                    <textarea name="longDescription" value={productData.longDescription} onChange={handleInputChange} required className="w-full border rounded-lg p-2"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select name="category" value={productData.category} onChange={handleInputChange} required className="w-full border rounded-lg p-2">
                        <option value="">Select a Category</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Coaster">Coaster</option>
                        <option value="Frame">Frame</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Decor">Decor</option>
                        <option value="Personal Care">Personal Care</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} required className="w-full border rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Product Images</label>
                    <input type="file" name="images" multiple onChange={handleImageChange} className="w-full p-2" />
                    <div className="flex flex-wrap mt-2">
                        {tempImages.map((image, index) => (
                            <img key={index} src={image} alt={`Product Preview ${index}`} className="w-32 h-32 object-cover rounded-lg mr-2 mb-2" />
                        ))}
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg flex justify-center items-center">
                    {isSubmitting ? <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span> : "Save Changes"}
                </button>
            </form>
        </div>
    </div>
    <MobileFooter />
    <WhatsAppChatRibbon />
    </>
    );
}

export default EditProduct;