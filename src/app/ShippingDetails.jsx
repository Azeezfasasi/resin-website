import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';

function ShippingDetails() {
    const [orders, setOrders] = useState([]);
    const [uniqueAddresses, setUniqueAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const userId = user?.id;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://resin-backend.onrender.com/api/orders?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);

                // Extract unique addresses
                const addresses = sortedOrders.map(order => `${order.streetAddress}, ${order.townCity}, ${order.state}, ${order.country}`);
                const unique = [...new Set(addresses)];
                setUniqueAddresses(unique);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);

    return (
        <>
            <Helmet>
                <title>Shipping Details - Resin By Saidat</title>
            </Helmet>
            <div className='w-full flex flex-row justify-start border mb-[80px] lg:mb-0'>
                <div className='w-[0%] lg:w-[20%]'>
                    <MyAccountMenu />
                </div>
                <div className='w-full flex flex-col'>
                    <AccountHeader />
                    <div className='w-[95%] lg:w-[60%] mx-auto my-10 flex flex-col justify-start gap-3'>
                        <table className="min-w-full h-[30vh] lg:h-[70vh] bg-white border border-gray-200 rounded-md shadow-md flex flex-col items-center justify-start">
                            <thead className="bg-yellow-100 flex flex-row items-center w-full justify-center mb-[40px]">
                                <tr>
                                    <th className="py-2 px-4 border-b text-center w-full lg:text-[26px]">Billing Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueAddresses.length > 0 && uniqueAddresses.map((address, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='w-full lg:w-[95%] flex flex-col items-center py-2 px-2 mx-auto rounded mb-3'>
                                                <div className='text-[18px] lg:text-[26px] font-bold text-yellow-900'>
                                                    Billing Address: <span className='font-semibold text-black'>
                                                        {address}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {uniqueAddresses.length === 0 && !loading && (
                                    <tr>
                                        <td className="py-4 text-center">No shipping details found.</td>
                                    </tr>
                                )}
                                {loading && (
                                    <tr>
                                        <td className="py-4 text-center">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <MobileFooter />
        </>
    );
}

export default ShippingDetails;