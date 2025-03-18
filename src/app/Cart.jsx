import React from "react";
import { useCart } from "../assets/components/context-api/product-context/CartContext";
import MainHeader from "../assets/components/home-components/MainHeader";
import TopHeader from "../assets/components/home-components/TopHeader";
import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";
import MobileFooter from "../assets/components/home-components/MobileFooter";
import RecentlyViewedProducts from "../assets/components/home-components/RecentlyViewedProducts";
import Footer from "../assets/components/home-components/Footer";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleClearCart = () => {
        clearCart();
    };

return (
    <>
    <TopHeader />
    <MainHeader />
    <section className="cart-section py-16 mt-[-50px] mb-[-10px] lg:mb-0">
      <div className="container mx-auto px-4 mb-[30px]">
        <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center text-xl font-semibold">Your cart is empty</div>
          ) : (
            <>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cart.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                      <Link to={`/app/product/${product._id}`}>
                        <img
                          src={product.images}
                          alt={product.name}
                          className="w-full h-48 object-contain rounded-md"
                        />
                        <div className="mt-4 flex flex-col items-center justify-center">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-gray-600">₦{product.price}</p>
                        </div>
                        </Link>
                        <button
                            onClick={() => handleRemove(product._id)}
                            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleClearCart}
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <RecentlyViewedProducts />
      </section>
      <Footer />
      <MobileFooter />
      <WhatsAppChatRibbon />
    </>
  );
};

export default Cart;