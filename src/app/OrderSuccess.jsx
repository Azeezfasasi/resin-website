import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopHeader from '../assets/components/home-components/TopHeader';
import MainHeader from '../assets/components/home-components/MainHeader';
import Footer from '../assets/components/home-components/Footer';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderNumber = location.state?.orderNumber; // Get orderNumber from location state

    const handleGoHome = () => {
        navigate('/app/shop');
    };

    return (
        <>
        <TopHeader />
        <MainHeader />
        <div className="flex flex-col items-center justify-start lg:min-h-screen mt-[40px] mb-[70px] lg:mb-0 lg:mt-[140px]">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            {orderNumber && <div className='text-[22px]'>Your order number is: <span className='font-bold'>{orderNumber}</span></div>}
            <button
                onClick={handleGoHome}
                className="bg-yellow-900 text-white p-2 mt-4 rounded font-semibold"
            >
                Continue Shopping
            </button>
        </div>
        <Footer />
        </>
    );
};

export default OrderSuccess;