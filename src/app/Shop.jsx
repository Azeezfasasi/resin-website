// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
// import MainHeader from "../assets/components/home-components/MainHeader";
// import { useCart } from "../assets/components/context-api/product-context/CartContext";
// import TopHeader from "../assets/components/home-components/TopHeader";
// import { Helmet } from "react-helmet";
// import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";
// import MobileFooter from "../assets/components/home-components/MobileFooter";

// const Shop = () => {
//     const { products } = useContext(ProductContext);
//     const { addToCart } = useCart();

//     const handleAddToCart = (product) => {
//         addToCart(product);
//         alert("Product added to cart!");
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Shop - Resin B Saidat</title>
//             </Helmet>
//             <TopHeader />
//             <MainHeader />
//             <section className="shop-section py-16">
//                 <div className="container mx-auto px-4">
//                     <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {products && products !== null && products.length > 0 ? (
//                             products.map((product) => (
//                                 <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
//                                     <Link to={`/app/product/${product._id}`}>
//                                         <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-md" />
//                                     </Link>
//                                     <div className="mt-4 flex flex-col items-start justify-center">
//                                         <h3 className="text-lg font-semibold">{product.name}</h3>
//                                         <p className="text-gray-600">₦{product.price}</p>
//                                     </div>
//                                     <div className="mt-6 flex flex-col items-center justify-center">
//                                         <Link to={`/app/product/${product._id}`} className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center">
//                                             View
//                                         </Link>
//                                         <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-center">No products available.</p>
//                         )}
//                     </div>
//                 </div>
//             </section>
//             <MobileFooter />
//             <WhatsAppChatRibbon />
//         </>
//     );
// };

// export default Shop;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
import MainHeader from "../assets/components/home-components/MainHeader";
import { useCart } from "../assets/components/context-api/product-context/CartContext";
import TopHeader from "../assets/components/home-components/TopHeader";
import { Helmet } from "react-helmet";
import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";
import MobileFooter from "../assets/components/home-components/MobileFooter";

const Shop = () => {
    const { products } = useContext(ProductContext);
    const { addToCart } = useCart();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const handleAddToCart = (product) => {
        addToCart(product);
        alert("Product added to cart!");
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products && products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = products ? Math.ceil(products.length / productsPerPage) : 0;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <>
            <Helmet>
                <title>Shop - Resin B Saidat</title>
            </Helmet>
            <TopHeader />
            <MainHeader />
            <section className="shop-section py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentProducts && currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                                    <Link to={`/app/product/${product._id}`}>
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-md" />
                                    </Link>
                                    <div className="mt-4 flex flex-col items-start justify-center">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-600">₦{product.price}</p>
                                    </div>
                                    <div className="mt-6 flex flex-col items-center justify-center">
                                        <Link to={`/app/product/${product._id}`} className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center">
                                            View
                                        </Link>
                                        <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products available.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 lg:mt-8 mb-[80px] lg:mb-0">
                        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mx-2 border rounded">
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 mx-2 border rounded">
                            Next
                        </button>
                    </div>
                </div>
            </section>
            <MobileFooter />
            <WhatsAppChatRibbon />
        </>
    );
};

export default Shop;