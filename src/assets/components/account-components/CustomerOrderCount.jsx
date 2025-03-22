import React, { useState, useEffect, useContext } from 'react';
import ordericon from '../../images/ordericon.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../context-api/user-context/UserContext';
import LoadingSpinner from '../LoadingSpinner';

function CustomerOrderCount() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const userId = user?.id;

    useEffect(() => {
        const fetchCustomerOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://resin-backend.onrender.com/api/orders?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer orders');
                }
                const data = await response.json();
                setTotalOrders(data.length); // Set total orders to the length of the fetched array
            } catch (error) {
                console.error('Error fetching customer orders:', error);
                alert('Failed to fetch customer orders.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === "Customer") {
            fetchCustomerOrders();
        }
    }, [userId, user?.role]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className='w-[100%] md:w-[95%] flex flex-col items-center justify-start gap-8 rounded-[20px] relative bg-[#ffffff] px-[10px] py-[20px] md:ml-[10px] mb-[0px] lg:mb-0 border mt-[-40px]'>
                {/* Cards section */}
                <div className='w-full flex flex-col md:flex-row items-center justify-center md:items-start gap-0 md:gap-5'>
                    {/* Total Order Card*/}
                    {user?.role === "Customer" && (
                        <div className='bg-[#fff4de] rounded-2xl w-[80%] md:w-[25%] h-[184px] relative'>
                            <div className="bg-[#ff947a] rounded-[50%] w-10 h-10 absolute left-5 top-5 flex flex-row items-center justify-center">
                                <img className="w-5 h-5 overflow-visible" src={ordericon} alt="Order Icon" />
                            </div>
                            <div className="text-greys-blue-grey-900 text-left font-2xl-semibold-font-family text-2xl-semibold-font-size leading-2xl-semibold-line-height font-2xl-semibold-font-weight absolute left-5 top-[76px]">{totalOrders}</div>
                            <div className="text-[#425166] text-left font-base-medium-font-family text-base-medium-font-size leading-base-medium-line-height font-base-medium-font-weight absolute left-5 top-[116px]">Total Order</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CustomerOrderCount;