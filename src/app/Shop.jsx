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
import { useWishlist } from "../assets/components/context-api/product-context/WishlistContext";
import LoadingSpinner from "../assets/components/LoadingSpinner";

const Shop = () => {
    const { products, loading } = useContext(ProductContext);
    const { addToCart } = useCart();
    // const { addToWishlist } = useWishlist();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [categoryFilter, setCategoryFilter] = useState("All");
    const [newProductFilter, setNewProductFilter] = useState("All");
    const [priceSort, setPriceSort] = useState("None");
    const [popup, setPopup] = useState({ show: false, product: null });
    
    const handleAddToCart = (product) => {
        addToCart(product);
        setPopup({ show: true, product });
    };

    const closePopup = () => {
        setPopup({ show: false, product: null });
    };

    // const handleAddToWishlist = (product) => {
    //     addToWishlist(product);
    //     alert("Product added to wishlist!");
    // };

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

    if (loading) {
        return <LoadingSpinner />;
    }

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
                                        <div className="w-full h-48 object-contain rounded-md flex overflow-hidden">
                                            {product.images && product.images.length > 0 && ( // Check if images exist
                                                <img
                                                    src={product.images[0]}
                                                    alt={`${product.name} - 0`}
                                                    className="w-[80%] h-full rounded-md object-fill mx-auto"
                                                />
                                            )}
                                        </div>
                                        <div className="mt-4 flex flex-col items-center justify-center">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-600">₦{product.basePrice}</p>
                                    </div>
                                    </Link>
                                    <div className="mt-6 flex flex-col items-center justify-center">
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

                {/* Add to cart pop up */}
                {popup.show && (
                    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                        <div className="bg-yellow-900 p-6 rounded-lg shadow-lg w-[350px] md:w-[400px] text-center relative">
                            <div onClick={closePopup} className="w-[10%] absolute top-3 right-3 md:top-2 md:right-0 cursor-pointer text-white hover:text-black">
                                <i className="fa-regular fa-rectangle-xmark text-[26px]"></i>
                            </div>
                            <h3 className="text-[24px] font-semibold text-white">Product Added!</h3>
                            <p className="text-white mt-2 mb-3"><span className="font-semibold">{popup.product.name}</span> has been added to your cart.</p>
                            <Link to="/app/cart" className="mt-0 bg-white text-black py-1 px-4 rounded hover:bg-blue-700 hover:text-white transition-colors">View Cart</Link>
                        </div>
                    </div>
                )}
            </section>
            <RecentlyViewedProducts />
            <Footer />
            <MobileFooter />
            <WhatsAppChatRibbon />
        </>
    );
};

export default Shop;