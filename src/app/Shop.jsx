// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
// import MainHeader from "../assets/components/home-components/MainHeader";
// import { useCart } from "../assets/components/context-api/product-context/CartContext";
// import TopHeader from "../assets/components/home-components/TopHeader";
// import { Helmet } from "react-helmet";
// import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";
// import MobileFooter from "../assets/components/home-components/MobileFooter";
// import RecentlyViewedProducts from "../assets/components/home-components/RecentlyViewedProducts";
// import Footer from "../assets/components/home-components/Footer";

// const Shop = () => {
//     const { products } = useContext(ProductContext);
//     const { addToCart } = useCart();

//     const [currentPage, setCurrentPage] = useState(1);
//     const productsPerPage = 8;

//     const [categoryFilter, setCategoryFilter] = useState("All");
//     const [newProductFilter, setNewProductFilter] = useState("All");
//     const [priceSort, setPriceSort] = useState("None");

//     const handleAddToCart = (product) => {
//         addToCart(product);
//         alert("Product added to cart!");
//     };

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

//     const filteredProducts = products
//         ? products.filter(product => {
//             if (categoryFilter !== "All" && product.category !== categoryFilter) {
//                 return false;
//             }

//             if (newProductFilter === "New" && !product.isNew) {
//                 return false;
//             }

//             if (newProductFilter === "Old" && product.isNew) {
//                 return false;
//             }

//             return true;
//         })
//         : []; // Initialize as an empty array if products is undefined

//     let sortedProducts = [...filteredProducts];

//     if (priceSort === "LowToHigh") {
//         sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (priceSort === "HighToLow") {
//         sortedProducts.sort((a, b) => b.price - a.price);
//     }

//     const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//     const totalPages = sortedProducts ? Math.ceil(sortedProducts.length / productsPerPage) : 0;

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

//     const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//     return (
//         <>
//             <Helmet>
//                 <title>Shop - Resin B Saidat</title>
//             </Helmet>
//             <TopHeader />
//             <MainHeader />
//             <section className="shop-section py-16 mt-[-40px]">
//                 <div className="container mx-auto px-4">
//                     <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

//                     {/* Filter Dropdowns */}
//                     <div className="flex flex-wrap justify-center mb-6">
//                         <select
//                             value={categoryFilter}
//                             onChange={(e) => setCategoryFilter(e.target.value)}
//                             className="mx-2 p-2 border rounded"
//                         >
//                             <option value="All">All Categories</option>
//                             {products && Array.from(new Set(products.map((product) => product.category))).map((category) => (
//                                 <option key={category} value={category}>
//                                     {category}
//                                 </option>
//                             ))}
//                         </select>

//                         <select
//                             value={priceSort}
//                             onChange={(e) => setPriceSort(e.target.value)}
//                             className="mx-2 p-2 border rounded"
//                         >
//                             <option value="None">Sort by Price</option>
//                             <option value="LowToHigh">Low to High</option>
//                             <option value="HighToLow">High to Low</option>
//                         </select>
//                     </div>

//                     {/* Product Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {currentProducts && currentProducts.length > 0 ? (
//                             currentProducts.map((product) => (
//                                 <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
//                                     <Link to={`/app/product/${product._id}`}>
//                                         <img
//                                             src={product.image}
//                                             alt={product.name}
//                                             className="w-full h-48 object-contain rounded-md"
//                                         />
//                                     </Link>
//                                     <div className="mt-4 flex flex-col items-start justify-center">
//                                         <h3 className="text-lg font-semibold">{product.name}</h3>
//                                         <p className="text-gray-600">₦{product.price}</p>
//                                     </div>
//                                     <div className="mt-6 flex flex-col items-center justify-center">
//                                         <Link
//                                             to={`/app/product/${product._id}`}
//                                             className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center"
//                                         >
//                                             View
//                                         </Link>
//                                         <button
//                                             onClick={() => handleAddToCart(product)}
//                                             className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                                         >
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-center">No products available.</p>
//                         )}
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="flex justify-center items-center mt-4 lg:mt-8 mb-[0px] lg:mb-0">
//                         <button
//                             onClick={prevPage}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 mx-2 border rounded"
//                         >
//                             Previous
//                         </button>
//                         <span>
//                             Page {currentPage} of {totalPages}
//                         </span>
//                         <button
//                             onClick={nextPage}
//                             disabled={currentPage === totalPages}
//                             className="px-4 py-2 mx-2 border rounded"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </section>
//             <RecentlyViewedProducts />
//             <Footer />
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
import RecentlyViewedProducts from "../assets/components/home-components/RecentlyViewedProducts";
import Footer from "../assets/components/home-components/Footer";

const Shop = () => {
    const { products } = useContext(ProductContext);
    const { addToCart } = useCart();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [categoryFilter, setCategoryFilter] = useState("All");
    const [newProductFilter, setNewProductFilter] = useState("All");
    const [priceSort, setPriceSort] = useState("None");

    const handleAddToCart = (product) => {
        addToCart(product);
        alert("Product added to cart!");
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products
        ? products.filter(product => {
            if (categoryFilter !== "All" && product.category !== categoryFilter) {
                return false;
            }

            if (newProductFilter === "New" && !product.isNew) {
                return false;
            }

            if (newProductFilter === "Old" && product.isNew) {
                return false;
            }

            return true;
        })
        : [];

    let sortedProducts = [...filteredProducts];

    if (priceSort === "LowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === "HighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = sortedProducts ? Math.ceil(sortedProducts.length / productsPerPage) : 0;

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
            <section className="shop-section py-16 mt-[-40px]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap justify-center mb-6">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="mx-2 p-2 border rounded"
                        >
                            <option value="All">All Categories</option>
                            {products && Array.from(new Set(products.map((product) => product.category))).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="mx-2 p-2 border rounded"
                        >
                            <option value="None">Sort by Price</option>
                            <option value="LowToHigh">Low to High</option>
                            <option value="HighToLow">High to Low</option>
                        </select>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentProducts && currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                                    <Link to={`/app/product/${product._id}`}>
                                        <div className="w-full h-48 object-contain rounded-md flex overflow-x-auto">
                                            {product.images && product.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`${product.name} - ${index}`}
                                                    className="min-w-full h-full object-contain rounded-md mr-2"
                                                />
                                            ))}
                                        </div>
                                    </Link>
                                    <div className="mt-4 flex flex-col items-start justify-center">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-600">₦{product.price}</p>
                                    </div>
                                    <div className="mt-6 flex flex-col items-center justify-center">
                                        <Link
                                            to={`/app/product/${product._id}`}
                                            className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                        >
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
                    <div className="flex justify-center items-center mt-4 lg:mt-8 mb-[0px] lg:mb-0">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-2 border rounded"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-2 border rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
            <RecentlyViewedProducts />
            <Footer />
            <MobileFooter />
            <WhatsAppChatRibbon />
        </>
    );
};

export default Shop;