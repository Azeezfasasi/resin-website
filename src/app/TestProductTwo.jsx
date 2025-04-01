import React, { useState, useContext, useRef } from 'react';
import { ProductContext } from '../assets/components/context-api/product-context/ProductContext';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import { Helmet } from 'react-helmet';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);

const [productData, setProductData] = useState({
    name: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    basePrice: '',
    images: [],
    variants: [
        { name: '', price: '', stock: '', image: [''], attributes: { color: '', size: '', material: '' } }
    ],
});
const [imagePreviews, setImagePreviews] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [popup, setPopup] = useState({ show: false });

const fileInputRef = useRef(null);

// const handleChange = (e) => {
//     if (e.target.name === 'images') {
//         const files = Array.from(e.target.files);
//         setProductData({ ...productData, images: files });
//         const previews = files.map(file => URL.createObjectURL(file));
//         setImagePreviews(previews);
//     } else {
//         setProductData({ ...productData, [e.target.name]: e.target.value });
//     }
// };
const handleChange = (e) => {
    if (e.target.name === 'images') {
        const files = Array.from(e.target.files);
        setProductData({ ...productData, images: files });
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    } else {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }
    console.log("productData after handleChange:", productData);
};


const addVariant = () => {
    setProductData((prev) => ({
        ...prev,
        variants: [...prev.variants, {
            name: '',
            price: '',
            stock: '',
            image: null,
            attributes: { color: '', size: '', material: '' }
        }],
    }));
};

const removeVariant = (index) => {
    setProductData((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
    }));
};

// const handleVariantChange = (index, key, value) => {
//     setProductData((prev) => {
//         const updatedVariants = [...prev.variants];
        
//         if (key.includes("attributes.")) {
//             const attributeKey = key.split(".")[1]; // Extract "color", "size", or "material"
//             updatedVariants[index].attributes = {
//                 ...updatedVariants[index].attributes,
//                 [attributeKey]: value,
//             };
//         } else {
//             updatedVariants[index][key] = value;
//         }
        
//         return { ...prev, variants: updatedVariants };
//     });
// };
const handleVariantChange = (index, key, value) => {
    setProductData((prev) => {
        const updatedVariants = [...prev.variants];
        
        if (key.includes("attributes.")) {
            const attributeKey = key.split(".")[1]; // Extract "color", "size", or "material"
            updatedVariants[index].attributes = {
                ...updatedVariants[index].attributes,
                [attributeKey]: value,
            };
        } else {
            updatedVariants[index][key] = value;
        }
        
        return { ...prev, variants: updatedVariants };
    });
    console.log("productData after handleVariantChange:", productData);
};


// const handleVariantImageChange = (index, key, file) => {
//     if (!file) return;

//     setProductData((prev) => {
//         const updatedVariants = [...prev.variants];
//         updatedVariants[index][key] = [file]; // Store as File instead of Base64
//         return { ...prev, variants: updatedVariants };
//     });
// };
const handleVariantImageChange = (index, key, file) => {
    if (!file) return;

    setProductData((prev) => {
        const updatedVariants = [...prev.variants];
        updatedVariants[index][key] = [file]; // Store as File instead of Base64
        return { ...prev, variants: updatedVariants };
    });
    console.log("productData after handleVariantImageChange:", productData);
};



const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();

    try {
        // const formData = new FormData();

        formData.append('name', productData.name);
        formData.append('category', productData.category);
        formData.append('shortDescription', productData.shortDescription);
        formData.append('longDescription', productData.longDescription);
        formData.append('basePrice', parseFloat(productData.basePrice));

        productData.images.forEach((image) => formData.append('images', image));

    
        // if (productData.variants.length > 0) {
        //     productData.variants.forEach((variant, index) => {
        //       formData.append(`variants[${index}][name]`, variant.name);
        //       console.log(`FormData after appending variants[${index}][name]: `, formData);

        //       formData.append(`variants[${index}][price]`, parseFloat(variant.price) || 0);
        //       console.log(`FormData after appending variants[${index}][price]: `, formData);

        //       formData.append(`variants[${index}][stock]`, parseInt(variant.stock) || 0);
        //       console.log(`FormData after appending variants[${index}][stock]: `, formData);

            //   if (variant.image.length > 0) {
            //     formData.append(`variants[${index}][image]`, variant.image[0]);
            //     console.log(`FormData after appending variants[${index}][image]: `, formData);
            //   }

        //       formData.append(`variants[${index}][attributes][color]`, variant.attributes.color);
        //       console.log(`FormData after appending variants[${index}][attributes][color]: `, formData);

        //       formData.append(`variants[${index}][attributes][size]`, variant.attributes.size);
        //       console.log(`FormData after appending variants[${index}][attributes][size]: `, formData);

        //       formData.append(`variants[${index}][attributes][material]`, variant.attributes.material);
        //       console.log(`FormData after appending variants[${index}][attributes][material]: `, formData);
        //     });
        //   }
         // Handle variants
         productData.variants.forEach((variant, index) => {
            formData.append(`variants[${index}][name]`, variant.name);
            formData.append(`variants[${index}][price]`, variant.price);
            formData.append(`variants[${index}][stock]`, variant.stock);
            formData.append(`variants[${index}][attributes][color]`, variant.attributes.color);
            formData.append(`variants[${index}][attributes][size]`, variant.attributes.size);
            formData.append(`variants[${index}][attributes][material]`, variant.attributes.material);
            // if (variant.image) {
            //     formData.append(`variantImage_${index}`, variant.image);
            // }
            if (variant.image.length > 0) {
                formData.append(`variants[${index}][image]`, variant.image[0]);
              }
        });
          

        console.log("FormData before sending:", formData); // Inspect FormData
        await addProduct(formData);
        console.log("Response:", response); // Debugging response

        setProductData({
            name: '',
            category: '',
            shortDescription: '',
            longDescription: '',
            basePrice: '',
            images: [],
            variants: [],
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setImagePreviews([]);
        setPopup({ show: true });
    } catch (error) {
        setError('Failed to add product. Please try again.');
    } finally {
        setLoading(false);
    }
};

const closePopup = () => {
    setPopup({ show: false });
};

  return (
  <>
   <Helmet>
      <title>Add Product - Resin By Saidat</title>
   </Helmet>
   <div className="w-full flex flex-row justify-start">
      <div className="w-[0%] lg:w-[20%]">
        <MyAccountMenu />
      </div>
      <div className="w-full flex flex-col items-start mt-0">
        <AccountHeader />
        <div className="container lg:h-[80vh] mx-auto mt-8 mb-[80px] lg:mb-0 overflow-y-scroll overflow-x-hidden">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                        Short Description:
                    </label>
                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={productData.shortDescription}
                        onChange={handleChange}
                        placeholder="Enter a short description"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
                        Long Description:
                    </label>
                    <textarea
                        id="longDescription"
                        name="longDescription"
                        value={productData.longDescription}
                        onChange={handleChange}
                        placeholder="Enter a long description"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="basePrice"
                        name="basePrice"
                        value={productData.basePrice}
                        onChange={handleChange}
                        required
                        placeholder="Enter the price in number only"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                        Images:
                    </label>
                    <p>You can add up to 10 images</p>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleChange}
                        multiple // Allow multiple files
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="flex mt-2">
                        {imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover mr-2" />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Variants</label>
                    {productData.variants.map((variant, index) => (
                        <div key={index} className="flex flex-col space-y-2 mb-2">
                            <input 
                                type="text" 
                                placeholder="Variant Name" 
                                name="name"
                                value={variant.name} 
                                onChange={(e) => handleVariantChange(index, "name", e.target.value)} 
                                className="border rounded px-2 py-1" 
                            />
                            <input 
                                type="number" 
                                placeholder="Variant Price" 
                                name="price"
                                value={variant.price || ""} 
                                onChange={(e) => handleVariantChange(index, "price", Number(e.target.value))} 
                                className="border rounded px-2 py-1" 
                            />
                            <input 
                                type="number" 
                                placeholder="Variant Stock" 
                                name="stock"
                                value={variant.stock || ""} 
                                onChange={(e) => handleVariantChange(index, "stock", Number(e.target.value))} 
                                className="border rounded px-2 py-1" 
                            />
                            <input 
                                type="file" 
                                name="image"
                                ref={fileInputRef}
                                onChange={(e) => handleVariantImageChange(index, "image", e.target.files[0])} 
                                className="border rounded px-2 py-1"
                            />
                            <div>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Color" 
                                name="color"
                                value={variant.attributes?.color || ""} 
                                onChange={(e) => handleVariantChange(index, "attributes.color", e.target.value)} 
                                className="border rounded px-2 py-1" 
                            />
                            <input 
                                type="text" 
                                placeholder="Size" 
                                name="size"
                                value={variant.attributes?.size || ""} 
                                onChange={(e) => handleVariantChange(index, "attributes.size", e.target.value)} 
                                className="border rounded px-2 py-1" 
                            />
                            <input 
                                type="text" 
                                placeholder="Material" 
                                name="material"
                                value={variant.attributes?.material || ""} 
                                onChange={(e) => handleVariantChange(index, "attributes.material", e.target.value)} 
                                className="border rounded px-2 py-1" 
                            />
                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white px-2 rounded">X</button>
                        </div>
                    ))}

                    <button type="button" onClick={addVariant} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add Variant</button>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        disabled={loading}
                    >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                            Adding Product...
                          </>
                        ) : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
      </div>

      {/* Submit popup */}
      {popup.show && (
            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                <div className="bg-yellow-900 p-6 rounded-lg shadow-lg w-[350px] md:w-[400px] text-center relative">
                    <div onClick={closePopup} className="w-[10%] absolute top-3 right-3 md:top-2 md:right-0 cursor-pointer text-white hover:text-black">
                        <i className="fa-regular fa-rectangle-xmark text-[26px]"></i>
                    </div>
                    <h3 className="text-[24px] font-semibold text-white">Product Added!</h3>
                    <p className="text-white mt-2 mb-3"><span className="font-semibold">Product </span> has been added successfully.</p>
                </div>
            </div>
        )}
    </div>
    <MobileFooter />
  </>
  );
};

export default AddProduct;
