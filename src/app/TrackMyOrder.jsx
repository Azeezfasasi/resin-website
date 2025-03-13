import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../assets/components/home-components/MainHeader';
import TopHeader from '../assets/components/home-components/TopHeader';
import Footer from '../assets/components/home-components/Footer';

function TrackMyOders() {
    const [orderId, setOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);

    const handleOrderIdChange = (e) => {
        setOrderId(e.target.value);
    };

    const handleTrackOrder = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            const response = await fetch(`https://resin-backend.onrender.com/api/orders/track/${orderId}`); // Replace with your backend endpoint

            if (!response.ok) {
                if (response.status === 404) {
                    setTrackingResult({ message: 'Order not found.' });
                } else {
                    throw new Error('Failed to track order');
                }
                return;
            }

            const data = await response.json();
            setTrackingResult(data);
        } catch (error) {
            console.error('Error tracking order:', error);
            setTrackingResult({ message: 'An error occurred while tracking your order.' });
        }
    };

    return (
        <>
            <Helmet>
                <title>Track Order - Resin By Saidat</title>
            </Helmet>
            <TopHeader />
            <MainHeader />
            <div className='w-full h-screen flex flex-row justify-start border'>
                {/* Main Account Section */}
                <div className='w-full flex flex-col'>
                    <div className='w-[80%] lg:w-[60%] mx-auto my-10 flex flex-col gap-3'>
                        <div className='font-semibold text-[20px]'>Track Your Orders</div>
                        <div className=''>To track your order please enter your Order Number in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</div>
                        <form onSubmit={handleTrackOrder}>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    placeholder='Order ID'
                                    className='border p-2'
                                    value={orderId}
                                    onChange={handleOrderIdChange}
                                />
                                <button className='bg-yellow-900 text-white p-2' type="submit">Track</button>
                            </div>
                        </form>

                        {trackingResult && (
                            <div className='mt-4'>
                                {trackingResult.message ? (
                                    <p>{trackingResult.message}</p>
                                ) : (
                                    <>
                                        <p><strong>Order Number:</strong> {trackingResult.orderNumber}</p>
                                        <p><strong>Product Name:</strong> {trackingResult.productName}</p>
                                        <p><strong>Order Status:</strong> {trackingResult.orderStatus}</p>
                                        <p><strong>Order Date:</strong> {trackingResult.orderDate}</p>
                                        <p><strong>Product Amount:</strong> {trackingResult.amount}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TrackMyOders;