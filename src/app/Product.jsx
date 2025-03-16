import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../assets/components/home-components/MainHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import loginimage from '../assets/images/loginimage.svg';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
import MobileFooter from '../assets/components/home-components/MobileFooter';
import WhatsAppChatRibbon from '../assets/components/home-components/WhatsappChatRibbon';

function Product() {
    const { products, deleteProduct, loading, error } = useContext(ProductContext);
    const navigate = useNavigate();
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(products)) {
            const alphabeticallySorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
            setSortedProducts(alphabeticallySorted);
        }
    }, [products]);

    const productList = sortedProducts;

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Pagination calculations
    const totalPages = Math.ceil(productList.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = productList.slice(startIndex, endIndex);

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

return (
    <>
    <Helmet>
        <title>Products - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start'>
        {/* Menu section */}
        <div className='w-[0%] md:w-[20%]'>
            <MyAccountMenu />
        </div>

        {/* Main Account Section */}
        <div className='w-full flex flex-col justify-start h-screen overflow-y-scroll overflow-x-hidden'>
            <AccountHeader />
            <div className='w-[90%] flex flex-row justify-between items-center mb-[50px] m-auto mt-10'>
                <h1 className='text-2xl font-bold'>Products</h1>
                <Link to="/app/addproduct" className='bg-yellow-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-md'>Add Product</Link>
            </div>

            {/* Display Total Products */}
            <p className="text-center text-[20px] lg:text-[22px] mb-4 font-semibold border px-8 py-4 w-[70%] lg:w-[25%] self-center rounded">Total Products: <span className='text-yellow-900 font-bold'>{productList.length}</span></p>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-0 mb-4">
                    <button
                        className={`px-4 py-2 rounded-md border ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-800 text-white"}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Back
                    </button>
                    <span className="font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-800 text-white"}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Products Grid */}
            <div className='w-full flex flex-col md:flex-row justify-center md:justify-start gap-5 items-center flex-wrap md:pl-4 md:pr-4'>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product._id} className='w-[90%] md:w-[23%] flex flex-col items-center border pt-2 pb-2 rounded-[8px] mb-4 hover:bg-red-50 shadow-md hover:shadow-slate-300'>
                            {product.images && product.images.length > 0 && (
                                <img src={product.images[0]} alt={product.name} className='w-[200px] h-[150px] object-contain rounded-md' />
                            )}
                            <p className='text-sm font-semibold'>{product.name}</p>
                            <div>₦ {product.price}</div>
                            <div className='font-semibold'>{product.category}</div>
                            <div className='flex flex-row gap-2'>
                                <Link to={`/app/editproduct/${product._id}`} className='bg-transparent border border-solid border-gray-500 text-black px-4 py-2 rounded-md mt-2 hover:bg-yellow-800 hover:text-white'><i className='fa fa-pencil'></i></Link>
                                <button className='bg-transparent border border-solid border-gray-500 text-black px-4 py-2 rounded-md mt-2 hover:bg-yellow-800 hover:text-white' onClick={() => handleDeleteProduct(product._id)}><i className='fa fa-trash'></i></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-full">No products available.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6 mb-[110px] lg:mb-0">
                    <button
                        className={`px-4 py-2 rounded-md border ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-800 text-white"}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Back
                    </button>
                    <span className="font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-800 text-white"}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
            <br />
            <br />
        </div>
    </div>
    <MobileFooter />
    </>
    );
}

export default Product;