import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ProductContext } from "../context-api/product-context/ProductContext";
import { useCart } from "../context-api/product-context/CartContext";

const ObjectWithSense = () => {
    const { products } = useContext(ProductContext);
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        alert("Product added to cart!");
    };

    // Limit to the first 10 products
    const limitedProducts = products && products.length > 0 ? products.slice(0, 10) : [];

    return (
        <section className="shop-section py-16">
            <div className="container mx-auto px-4 border">
                <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    // pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {products && products.length > 0 ? (
                        limitedProducts.map((product) => (
                            <SwiperSlide key={product._id}>
                                <div className="bg-white rounded-lg shadow-md p-4 w-[100%] border">
                                    <Link to={`/app/product/${product._id}`} className="text-center">
                                        {product.images && product.images.length > 0 && (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-[80%] h-[250px] object-fit rounded-md mx-auto"
                                            />
                                        )}
                                    </Link>
                                    <div className="mt-4 flex flex-col items-center justify-start md:items-center md:justify-start">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-600">₦{product.price}</p>
                                    </div>
                                    <div className="mt-6 flex flex-col items-center">
                                        <Link
                                            to={`/app/product/${product._id}`}
                                            className="mt-2 w-full bg-yellow-900 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center"
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
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center">No products available.</p>
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default ObjectWithSense;