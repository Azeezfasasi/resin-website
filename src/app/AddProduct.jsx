import React, { useState, useContext } from 'react';
import { ProductContext } from '../assets/components/context-api/product-context/ProductContext';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import { Helmet } from 'react-helmet';
import MobileFooter from '../assets/components/home-components/MobileFooter';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    price: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === 'images') {
        const files = Array.from(e.target.files); // Convert FileList to array
        setProductData({ ...productData, images: files });

        // Generate preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    } else {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const formData = new FormData();
  //     formData.append('name', productData.name);
  //     formData.append('category', productData.category);
  //     formData.append('shortDescription', productData.shortDescription);
  //     formData.append('longDescription', productData.longDescription);
  //     formData.append('price', productData.price);

  //     // Append each image
  //     productData.images.forEach(image => {
  //       formData.append('images', image);
  //   });

  //     await addProduct(formData);
      
  //     setProductData({
  //       name: '',
  //       category: '',
  //       shortDescription: '',
  //       longDescription: '',
  //       price: '',
  //       images: [],
  //     });

  //     setImagePreviews([]); // Clear previews
  //   } catch (error) {
  //     setError('Failed to add product. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('category', productData.category);
        formData.append('shortDescription', productData.shortDescription);
        formData.append('longDescription', productData.longDescription);
        formData.append('price', productData.price);

        // Append each image individually
        productData.images.forEach(image => {
            formData.append('images', image); // Append each file separately
        });

        await addProduct(formData);

        setProductData({
            name: '',
            category: '',
            shortDescription: '',
            longDescription: '',
            price: '',
            images: [],
        });

        setImagePreviews([]); // Clear previews
    } catch (error) {
        setError('Failed to add product. Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
  <>
   <Helmet>
      <title>Add Product - Resin By Saidat</title>
   </Helmet>
   <div className="w-full flex flex-row justify-start">
      <div className="w-[0%] md:w-[20%]">
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
                        id="price"
                        name="price"
                        value={productData.price}
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
    </div>
    <MobileFooter />
  </>
  );
};

export default AddProduct;
