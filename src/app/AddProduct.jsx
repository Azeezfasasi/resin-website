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
    image: null,
  });
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('category', productData.category);
    formData.append('shortDescription', productData.shortDescription);
    formData.append('longDescription', productData.longDescription);
    formData.append('price', productData.price);
    formData.append('image', productData.image);

    await addProduct(formData);
    setProductData({
      name: '',
      category: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      image: null,
    });
    alert('Product added successfully');
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
        <div className="container mx-auto mt-8 mb-[80px] lg:mb-0">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? "Adding Product..." : "Add Product"}
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
