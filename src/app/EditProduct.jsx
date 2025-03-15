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

    const [productName, setProductName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (productsLoading) return;
        if (productsError) {
            console.error("error loading products", productsError);
            alert("Error loading products");
            return;
        }

        if (!products || products.length === 0) {
            console.error("Products not found or empty");
            return;
        }

        const product = products.find((p) => String(p._id) === id); // Use String() for comparison
        if (product) {
            setProductName(product.name);
            setShortDescription(product.description || "");
            setLongDescription(product.longDescription || "");
            setPrice(product.price || "");
            setImage(product.image || null);
            setCategory(product.category || "");
        } else {
            alert("Product not found");
            navigate("/app/product");
        }
    }, [id, products, navigate, productsLoading, productsError]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!productName || !price) {
    //         alert("All fields are required!");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("_id", id);
    //     formData.append("name", productName);
    //     formData.append("description", shortDescription);
    //     formData.append("longDescription", longDescription);
    //     formData.append("price", parseFloat(price));
    //     formData.append("category", category);

    //     if (image instanceof File) {
    //         formData.append("image", image);
    //     }

    //     try {
    //         await updateProduct(formData);
    //         alert("Product updated successfully!");
    //         navigate("/app/product");
    //     } catch (error) {
    //         console.error("Error updating product:", error);
    //         if (error.response) {
    //             console.error("Server responded with:", error.response.data);
    //             alert(`Failed to update product: ${error.response.data.message || "Server error"}`);
    //         } else if (error.request) {
    //             console.error("No response from server:", error.request);
    //             alert("Failed to update product: No response from server");
    //         } else {
    //             console.error("Error setting up request:", error.message);
    //             alert(`Failed to update product: ${error.message}`);
    //         }
    //     }
    // };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!productName || !price) {
          alert("All fields are required!");
          return;
      }
  
      const formData = new FormData();
      formData.append("_id", id);
      formData.append("name", productName);
      formData.append("description", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("price", parseFloat(price));
      formData.append("category", category);
  
      if (image instanceof File) {
          // New image uploaded, send the file
          formData.append("image", image);
      } else {
          // No new image uploaded, explicitly tell the backend to keep the existing image
          formData.append("keepImage", "true"); // Or a similar flag
      }
  
      try {
          await updateProduct(formData);
          alert("Product updated successfully!");
          navigate("/app/product");
      } catch (error) {
          // ... (error handling)
      }
  };

    if (productsLoading) {
        return <p>Loading...</p>;
    }
  

  return (
    <>
      <Helmet>
        <title>Edit Product - Resin By Saidat</title>
      </Helmet>
      <div className="w-full flex flex-row justify-start">
        <div className="w-[0%] md:w-[20%]">
          <MyAccountMenu />
        </div>
        <div className="w-full md:w-[80%] flex flex-col justify-start">
          <AccountHeader />
          <div className="w-full flex flex-col items-start">
            <h2 className="text-2xl font-semibold mb-6 mt-8 ml-2 md:ml-0 md:pl-6">
              Edit Product
            </h2>
            <form
              onSubmit={handleSubmit}
              className="md:w-full w-[95%] max-w-lg flex flex-col m-auto md:m-0 md:pl-6"
            >
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              {/* Short Description */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                  Short Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="shortDescription"
                  placeholder="Enter product description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>

              {/* Long Description */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
                  Long Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="longDescription"
                  placeholder="Enter product description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
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

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price (₦)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* Product Image */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="shadow appearance-none border rounded w-full lg:w-[40%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleImageChange}
                />
                {image && (
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    alt="Product Preview"
                    className="mt-2 w-32 h-32 object-cover"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-yellow-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <MobileFooter />
      <WhatsAppChatRibbon />
    </>
  );
}

export default EditProduct;
