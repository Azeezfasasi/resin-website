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
    const [popup, setPopup] = useState({ show: false, product: null });

    const [productData, setProductData] = useState({
        name: "",
        category: "",
        shortDescription: "",
        longDescription: "",
        basePrice: "",
        images: [],
        variants: [],
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
                basePrice: product.basePrice || '',
                images: product.images || [], // Set images from product
                variants: product.variants || [],
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

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...productData.variants];
        updatedVariants[index][field] = value;
        setProductData((prev) => ({ ...prev, variants: updatedVariants }));
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
        formData.append("price", productData.basePrice);
        formData.append('variants', JSON.stringify(productData.variants));
    
        newImages.forEach((file) => {
            formData.append("images", file);
        });
    
        try {
            await updateProduct(formData);
            // alert("Product updated successfully!");
            setPopup({ show: true});
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

    const closePopup = () => {
        setPopup({ show: false, product: null });
    };


    const addVariant = () => {
        setProductData((prev) => ({
            ...prev,
            variants: [...prev.variants, { name: '', value: '' }],
        }));
    };

    const removeVariant = (index) => {
        setProductData((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

return (
    <>
    <Helmet>
        <title>Edit Product - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start'>
        <div className="w-[0%] lg:w-[20%]">
            <MyAccountMenu />
        </div>
        <div className="w-full md:w-[80%]">
            <AccountHeader />
            <h2 className="text-2xl font-semibold mt-4 mb-2 ml-[20px] text-yellow-900">Edit Product</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="max-w-screen-md space-y-4 bg-white p-6 rounded-lg shadow-md h-[130vh] lg:h-[75vh] overflow-y-scroll overflow-x-hidden">
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
                    <input type="number" name="price" value={productData.basePrice} onChange={handleInputChange} required className="w-full border rounded-lg p-2" />
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
                {/* Variant */}
                <div>
                    <label className="block text-gray-700">Variants</label>
                    {productData.variants.map((variant, index) => (
                        <div key={index} className="flex space-x-2 mb-2">

                            {/* Variant name */}
                            <select value={variant.name} onChange={(e) => handleVariantChange(index, 'name', e.target.value)} className="border rounded px-2 py-1">
                                <option value="">Select Attribute</option>
                                <option value="size">Size</option>
                                <option value="color">Color</option>
                                <option value="material">Material</option>
                                <option value="weight">Weight</option>
                                <option value="length">Length</option>
                                <option value="width">Width</option>
                                <option value="hight">Height</option>
                            </select>

                            {/* Variant Value */}
                            <input type="text" placeholder="Variant Value" value={variant.value} onChange={(e) => handleVariantChange(index, 'value', e.target.value)} className="border rounded px-2 py-1" required />
                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white px-2 rounded">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add Variant</button>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg flex justify-center items-center">
                    {isSubmitting ? <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span> : "Save Changes"}
                </button>
            </form>
        </div>

        {/* Submit popup */}
      {popup.show && (
            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                <div className="bg-yellow-900 p-6 rounded-lg shadow-lg w-[350px] md:w-[400px] text-center relative">
                    <div onClick={closePopup} className="w-[10%] absolute top-3 right-3 md:top-2 md:right-0 cursor-pointer text-white hover:text-black">
                        <i className="fa-regular fa-rectangle-xmark text-[26px]"></i>
                    </div>
                    <h3 className="text-[24px] font-semibold text-white">Product Updated!</h3>
                    <p className="text-white mt-2 mb-3"><span className="font-semibold">Product </span> has been updated successfully.</p>
                </div>
            </div>
        )}
    </div>
    <MobileFooter />
    <WhatsAppChatRibbon />
    </>
    );
}

export default EditProduct;