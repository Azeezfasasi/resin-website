import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../assets/components/context-api/product-context/ProductContext";
import MainHeader from "../assets/components/home-components/MainHeader";
import { useCart } from "../assets/components/context-api/product-context/CartContext";
import TopHeader from "../assets/components/home-components/TopHeader";
import { Helmet } from "react-helmet";
import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";
import MobileFooter from "../assets/components/home-components/MobileFooter";
import RecentlyViewedProducts from "../assets/components/home-components/RecentlyViewedProducts";
import Footer from "../assets/components/home-components/Footer";

const ProductSingle = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [popup, setPopup] = useState({ show: false, product: null });
    const [selectedVariants, setSelectedVariants] = useState({});

    // Find the product when the component mounts or when products list changes
    useEffect(() => {
        if (products?.length > 0) {
            const foundProduct = products.find((p) => p._id === id);
            setProduct(foundProduct || null);
        }
    }, [id, products]);

    // const handleAddToCart = (product) => {
    //     addToCart(product);
    //     setPopup({ show: true, product });
    // };
    const handleAddToCart = (product, variant) => {
        const productToAdd = {
            ...product,
            selectedVariant: variant,
        };
        addToCart(productToAdd);
        setPopup({ show: true, product: productToAdd });
    };

    // const handleBuyNow = (product) => {
    //     addToCart(product);
    //     navigate("/app/cart");
    // };
    const handleBuyNow = (product, variant) => {
        const productToAdd = {
            ...product,
            selectedVariant: variant,
        };
        addToCart(productToAdd);
        navigate("/app/cart");
    };

    const closePopup = () => {
        setPopup({ show: false, product: null });
    };

    // Function to handle variant selection
    const handleVariantSelect = (variantName, variantValue) => {
        setSelectedVariants({
            ...selectedVariants,
            [variantName]: variantValue,
        });
    };

    // Find the selected variant object based on the selected variants
    const getSelectedVariant = () => {
        if (!product || !product.variants) return null;

        return product.variants.find(variant => {
            return Object.entries(selectedVariants).every(([name, value]) => {
                return variant.name === name && variant.value === value;
            });
        });
    };

    const selectedVariant = getSelectedVariant();

    // Handle Recently Viewed Products
    useEffect(() => {
        if (product) {
            let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            const isAlreadyViewed = recentlyViewed.some(viewedProduct => viewedProduct._id === product._id);

            if (!isAlreadyViewed) {
                recentlyViewed = [product, ...recentlyViewed.slice(0, 6)];
                localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
            }
        }
    }, [product, id]);

    // Handling order on WhatsApp
    const handleOrderViaWhatsApp = async (product) => {
        const orderDetails = {
            orderNumber: Math.floor(Math.random() * 100000000),
            orderDate: new Date().toLocaleDateString(),
            productName: product.name,
            amount: product.price,
        };

        const whatsappNumber = "2348184128107";
        const whatsappMessage = `Hello Resin By Saidat! I am interested in purchasing the following product:\n\n- Name: ${product.name}\n- Order Number: ${orderDetails.orderNumber}\n- Short Description: ${product.shortDescription || "No description available"}\n- Price: ₦${product.basePrice}\n- Category: ${product.category || "No category available"}\n- Product Description: ${product.longDescription || "No detailed description available"}\n\n - Product Link: ${window.location.href}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, "_blank");

        try {
            const response = await fetch('https://resin-backend.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to send order details');
            }
        } catch (error) {
            console.error('Error sending order details:', error);
            alert('Failed to send order. Please try again.');
        }
    };

    if (!product) {
        return (
            <div className="text-center mt-16">
                <p>Product not found!</p>
                <Link to="/app/shop" className="text-blue-500 underline">Return to Shop</Link>
            </div>
        );
    }

    // Open modal and set current image index
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Navigate next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    // Navigate previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

return (
    <>
    <Helmet>
        <title>{product.name} - Resin By Saidat</title>
    </Helmet>
    <TopHeader />
    <MainHeader />
    <div className="product-single-section py-16 mb-[0px] lg:mb-0">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image Section */}
                <div className="w-full lg:w-1/2 relative">
                {product?.images?.length > 0 && (
                <>
                    <img
                        src={product.images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-[400px] rounded-md shadow-md object-cover cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                        {/* Navigation Arrows */}
                        {product.images.length > 1 && (
                        <>
                            <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)} 
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                                &lt;
                            </button>
                                <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)} 
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                                &gt;
                            </button>
                        </>
                        )}

                        {/* Thumbnail Images */}
                        <div className="flex justify-center mt-3 gap-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${index === currentImageIndex ? "border-2 border-yellow-900" : ""}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                            ))}
                        </div>
                        </>
                    )}

                    <div className="mb-0 lg:mb-2 flex flex-row justify-start items-center gap-1">
                        <h2 className="text-lg font-bold">Category:</h2>
                        <p>{product.category || "No category available"}</p>
                    </div>

                    {/* Product Description */}
                    <div className="border mt-5 pl-2 hidden lg:block pb-2">
                        <div className="text-[26px] font-bold">Product Details</div>
                        <p>{product.longDescription}</p>
                    </div>
                </div>
                
                {/* Product Details Section */}
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-700 mb-4">{product.shortDescription}</p>
                        <p className="text-xl font-semibold mb-4">₦{product.basePrice}</p>

                        <div className="w-[45%] mt-6">
                            {product?.variants && product.variants.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold">Variation Available:</h2>
                                    {product.variants.reduce((uniqueNames, variant) => {
                                        if (!uniqueNames.includes(variant.name)) {
                                            uniqueNames.push(variant.name);
                                        }
                                        return uniqueNames;
                                    }, []).map(variantName => (
                                        <div key={variantName} className="mb-2">
                                            <label className="block text-sm font-medium text-yellow-950">{variantName.replace(/\b\w/g, (char) => char.toUpperCase())}:</label>
                                            <select
                                                value={selectedVariants[variantName] || ''}
                                                onChange={(e) => handleVariantSelect(variantName, e.target.value)}
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">Select {variantName}</option>
                                                {product.variants
                                                    .filter(variant => variant.name === variantName)
                                                    .map(variant => (
                                                        <option key={variant.value} value={variant.value}>
                                                            {variant.value}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button className="bg-yellow-900 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors mb-3" onClick={() => handleAddToCart(product, selectedVariant)}>Add to Cart</button>
                        <br />
                        {/* WhatsApp Button */}
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition-colors mb-3" onClick={() => handleOrderViaWhatsApp(product)}><i className="fa-brands fa-whatsapp"></i> Order Via WhatsApp</button>
                        <br />
                        <Link to="/app/cart" onClick={() => handleBuyNow(product, selectedVariant)} className="bg-yellow-900 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors" >Buy Now</Link>
                    </div>

                    {/* Product Description */}
                    <div className="border mt-5 pl-2 block lg:hidden pb-3">
                        <div className="text-[26px] font-bold">Product Details</div>
                        <p>{product.longDescription}</p>
                    </div>
            </div>
            </div>
        </div>

        {/* Full-Screen Modal */}
        {isModalOpen && product?.images?.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative w-[90%] md:w-[60%]">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 bg-white text-red-900 p-2 rounded-full">
                    ✕
                </button>
                <img src={product.images[currentImageIndex]} alt={product.name} className="w-full max-h-[80vh] object-contain" />

                    {/* Modal Navigation */}
                    {product.images.length > 1 && (
                    <>
                        <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)} 
                            className="absolute top-1/2 left-4 bg-gray-800 text-white p-3 rounded-full">
                            &lt;
                        </button>
                        <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)} 
                            className="absolute top-1/2 right-4 bg-gray-800 text-white p-3 rounded-full">
                            &gt;
                        </button>
                    </>
                )}
            </div>
        </div>
    )}

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

    <RecentlyViewedProducts />
    <Footer />
    <MobileFooter />
    <WhatsAppChatRibbon />
    </>
    );
};

export default ProductSingle;