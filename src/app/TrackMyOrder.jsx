import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../assets/components/home-components/MainHeader';
import TopHeader from '../assets/components/home-components/TopHeader';
import Footer from '../assets/components/home-components/Footer';

function TrackMyOrders() {
    const [orderId, setOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOrderIdChange = (e) => {
        setOrderId(e.target.value);
    };

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTrackingResult(null);

        try {
            const response = await fetch(`https://resin-backend.onrender.com/api/orders/track/${orderId}`);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Track Order - Resin By Saidat</title>
            </Helmet>
            <TopHeader />
            <MainHeader />
            <div className='w-full min-h-screen flex flex-row justify-start border'>
                <div className='w-full flex flex-col'>
                    <div className='w-[80%] lg:w-[60%] mx-auto my-10 flex flex-col gap-3'>
                        <div className='font-semibold text-[20px]'>Track Your Orders</div>
                        <div className=''>
                            To track your order please enter your Order Number in the box below and press the "Track" button. 
                            This was given to you on your receipt and in the confirmation email you should have received.
                        </div>
                        <form onSubmit={handleTrackOrder}>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    placeholder='Order ID'
                                    className='border p-2'
                                    value={orderId}
                                    onChange={handleOrderIdChange}
                                    required
                                />
                                <button 
                                    className='bg-yellow-900 hover:bg-yellow-600 text-white p-2 flex items-center justify-center disabled:bg-gray-400' 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                            Tracking...
                                        </>
                                    ) : "Track"}
                                </button>
                            </div>
                        </form>

                        {trackingResult && (
                            <div className='mt-2 lg:mt-4 border py-3 px-2 rounded shadow-md'>
                                {trackingResult.message ? (
                                    <p>{trackingResult.message}</p>
                                ) : (
                                    <>
                                    <div className='w-full lg:w-[60%] flex flex-col items-center border py-2 px-2 mx-auto bg-yellow-100 rounded mb-3'>
                                        <div className='text-[18px] lg:text-[26px]'>Order Status: <span className='font-bold'>{trackingResult.orderStatus}</span></div>
                                    </div>
                                    <p><strong>Order Number: </strong> {trackingResult.orderNumber}</p>
                                    <p><strong>Product Name: </strong> {trackingResult.productName}</p>
                                    <p><strong>Order Status: </strong> 
                                    {trackingResult.orderStatus}</p>
                                    <p><strong>Customer's Name: </strong> {trackingResult.firstName} {trackingResult.lastName}</p>
                                    <p><strong>Customer's Phone: </strong> {trackingResult.phone}</p>
                                    <p><strong>Shipping Address: </strong> {trackingResult.streetAddress}</p>
                                    <p><strong>State: </strong> {trackingResult.state}</p>
                                    <p><strong>Town: </strong> {trackingResult.townCity}</p>
                                    <p><strong>Order Date: </strong> {trackingResult.orderDate}</p>
                                    <p><strong>Product Amount: </strong> {trackingResult.amount}</p>
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

export default TrackMyOrders;
