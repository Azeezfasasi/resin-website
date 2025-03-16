import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const { products, updateProduct } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (products && products.length > 0) {
            const foundProduct = products.find((p) => p._id === id);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                console.error("Product not found");
            }
        }
    }, [id, products]);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert("Product added to cart!");
    };

    // Recently viewed product
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

    const handleOrderViaWhatsApp = async (product) => {
      const orderDetails = {
          orderNumber: Math.floor(Math.random() * 100000000),
          orderDate: new Date().toLocaleDateString(),
          productName: product.name,
          amount: product.price,
      };

      // 1. Send order details to WhatsApp
      const whatsappNumber = "2348184128107";
      const whatsappMessage = `Hello Resin By Saidat! I am interested in purchasing the following product:\n\n- Name: ${product.name}\n- Order Number: ${orderDetails.orderNumber}\n- Short Description: ${product.shortDescription || "No description available"}\n- Price: ₦${product.price}\n- Category: ${product.category || "No category available"}\n- Product Description: ${product.longDescription || "No detailed description available"}\n\n - Product Link: ${window.location.href}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");

      // 2. Send order details to backend
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
                <a href="/" className="text-blue-500 underline">Return to Home</a>
            </div>
        );
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

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
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 relative">
                    {product.images && product.images.length > 0 && (
                        <img
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-md shadow-md"
                        />
                    )}
                    {product.images && product.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        >
                            &gt;
                        </button>
                    </>
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.shortDescription}</p>
                    <p className="text-xl font-semibold mb-4">Price: ₦{product.price}</p>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold">Category:</h2>
                        <p>{product.category || "No category available"}</p>
                    </div>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-3" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <br />
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors" onClick={() => handleOrderViaWhatsApp(product)}>Order Via WhatsApp</button>
                </div>
            </div>
            <div className="border border-solid border-gray-200 w-full md:w-[50%] mt-6 flex flex-row items-start justify-start pl-2 mb-[-30px] lg:mb-0">
                <div className="flex flex-col">
                    <div className="text-[28px] font-bold mb-2">Product Description</div>
                    <p>{product.longDescription || "No detailed description available"}</p>
                </div>
            </div>
        </div>
    </div>
    <RecentlyViewedProducts />
    <Footer />
    <MobileFooter />
    <WhatsAppChatRibbon />
    </>
    );
};

export default ProductSingle;