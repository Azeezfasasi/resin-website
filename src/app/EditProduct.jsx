// import React, { useState, useContext, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
// import AccountHeader from "../assets/components/account-components/AccountHeader";
// import MyAccountMenu from "../assets/components/account-components/MyAccountMenu";
// import { Helmet } from "react-helmet";
// import MobileFooter from "../assets/components/home-components/MobileFooter";
// import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";

// function EditProduct() {
//     const { products, updateProduct, loading: productsLoading, error: productsError } = useContext(ProductContext);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [productData, setProductData] = useState({
//         name: "",
//         category: "",
//         shortDescription: "",
//         longDescription: "",
//         price: "",
//         image: null,
//     });
//     const [tempImage, setTempImage] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (productsLoading) return;
//         if (productsError) {
//             console.error("Error loading products", productsError);
//             alert("Error loading products");
//             return;
//         }

//         if (!products || products.length === 0) {
//             console.error("Products not found or empty");
//             return;
//         }

//         const product = products.find((p) => String(p._id) === id);
//         if (product) {
//             setProductData({
//                 name: product.name || '',
//                 category: product.category || '',
//                 shortDescription: product.shortDescription || '',
//                 longDescription: product.longDescription || '',
//                 price: product.price || '',
//                 image: product.image || null, // Keep existing image
//             });

//             setTempImage(product.image ? `https://resin-backend.onrender.com/uploads/${product.image}` : null);
//         } else {
//             alert("Product not found");
//             navigate("/app/product");
//         }
//     }, [id, products, navigate, productsLoading, productsError]);

//     // Handle text input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProductData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Handle image file selection
//     const handleImageChange = (e) => {
//       const { name, value, type, files } = e.target;
  
//       if (type === "file" && files.length > 0) {
//           const file = files[0];
//           setProductData((prevData) => ({
//               ...prevData,
//               image: file, // Set the new file
//           }));
//           setTempImage(URL.createObjectURL(file)); // Show image preview
//       } else {
//           setProductData((prevData) => ({
//               ...prevData,
//               [name]: value,
//           }));
//       }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("_id", id);
//     formData.append("name", productData.name);
//     formData.append("category", productData.category);
//     formData.append("shortDescription", productData.shortDescription);
//     formData.append("longDescription", productData.longDescription);
//     formData.append("price", productData.price);

//     if (productData.image instanceof File) {
//         formData.append("image", productData.image); // Append new image
//     } else {
//         formData.append("keepImage", "true"); // Tell backend to keep existing image
//     }

//     try {
//         await updateProduct(formData);
//         alert("Product updated successfully!");
//         navigate("/app/product");
//     } catch (error) {
//         console.error("Error updating product:", error);
//         alert("Error updating product. Please try again.");
//         setError("Error updating product. Please try again.");
//     }
// };  

//     if (productsLoading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>Edit Product - Resin By Saidat</title>
//             </Helmet>
//             <div className="w-full flex flex-row justify-start">
//                 <div className="w-[0%] md:w-[20%]">
//                     <MyAccountMenu />
//                 </div>
//                 <div className="w-full md:w-[80%] flex flex-col justify-start">
//                     <AccountHeader />
//                     <div className="w-full flex flex-col items-start">
//                         <h2 className="text-2xl font-semibold mb-6 mt-8 ml-2 md:ml-0 md:pl-6">
//                             Edit Product
//                         </h2>
//                         <form onSubmit={handleSubmit} className="md:w-full w-[95%] max-w-lg flex flex-col m-auto md:m-0 md:pl-6">
//                             {error && <div className="text-red-500 mb-4">{error}</div>}

//                             <label>Product Name</label>
//                             <input type="text" name="name" value={productData.name} onChange={handleInputChange} required />

//                             <label>Short Description</label>
//                             <textarea name="shortDescription" value={productData.shortDescription} onChange={handleInputChange} required />

//                             <label>Long Description</label>
//                             <textarea name="longDescription" value={productData.longDescription} onChange={handleInputChange} required />

//                             <label>Category</label>
//                             <select name="category" value={productData.category} onChange={handleInputChange} required>
//                                 <option value="">Select a Category</option>
//                                 <option value="Accessories">Accessories</option>
//                                 <option value="Coaster">Coaster</option>
//                                 <option value="Frame">Frame</option>
//                                 <option value="Stationery">Stationery</option>
//                                 <option value="Jewelry">Jewelry</option>
//                                 <option value="Decor">Decor</option>
//                                 <option value="Personal Care">Personal Care</option>
//                             </select>

//                             <label>Price</label>
//                             <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />

//                             <label>Product Image</label>
//                             <input type="file" name="image" onChange={handleImageChange} />
//                             {tempImage && <img src={tempImage} alt="Product Preview" className="w-32 h-32 object-cover" />}

//                             <button type="submit">Save Changes</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <MobileFooter />
//             <WhatsAppChatRibbon />
//         </>
//     );
// }

// export default EditProduct;

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
        image: null,
    });
    const [tempImage, setTempImage] = useState(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                image: product.image || null,
            });

            setTempImage(product.image ? `https://resin-backend.onrender.com/uploads/${product.image}` : null);
        } else {
            alert("Product not found");
            // navigate("/app/product");
            navigate("/app/product", { replace: true });
            window.location.reload();

        }
    }, [id, products, navigate, productsLoading, productsError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setProductData((prevData) => ({ ...prevData, image: file }));
            setTempImage(URL.createObjectURL(file));
        }
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

        if (productData.image instanceof File) {
            formData.append("image", productData.image);
        } else {
            formData.append("keepImage", "true");
        }

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
                            <label className="block text-sm font-medium">Product Image</label>
                            <input type="file" name="image" onChange={handleImageChange} className="w-full p-2" />
                            {tempImage && <img src={tempImage} alt="Product Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
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