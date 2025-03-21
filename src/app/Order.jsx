import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import OrderStatusChart from '../assets/components/account-components/OrderChart';
import LoadingSpinner from '../assets/components/LoadingSpinner';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://resin-backend.onrender.com/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();

                // Sort orders by orderDate in descending order (most recent first)
                const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

                setOrders(sortedOrders);
                setTotalOrders(sortedOrders.length);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`https://resin-backend.onrender.com/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order));

        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalOrders / ordersPerPage)));

    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
        <Helmet>
            <title>Orders - Resin By Saidat</title>
        </Helmet>
        <div className='w-full flex flex-row justify-start border mb-[100px] lg:mb-0'>
            <div className='w-[0%] lg:w-[20%]'>
                <MyAccountMenu />
            </div>

            <div className='w-full flex flex-col'>
                <AccountHeader />
              <div className="w-[95%] lg:w-[80%] mx-auto mt-8 lg:h-[80vh] overflow-y-scroll overflow-x-hidden">
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
                    <p className="font-semibold">Total Orders: <span className="text-blue-600">{totalOrders}</span></p>
                    <div className="flex items-center">
                        <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-yellow-800 text-white rounded disabled:opacity-50">Previous</button>
                        <span className="mx-2">Page {currentPage} of {Math.ceil(totalOrders / ordersPerPage)}</span>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)} className="px-3 py-1 bg-yellow-800 rounded disabled:opacity-50 text-white">Next</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Order Number</th>
                                <th className="py-2 px-4 border-b">Order Date</th>
                                <th className="py-2 px-4 border-b">Product Name</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                                    <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b">{order.productName}</td>
                                    <td className="py-2 px-4 border-b">₦{order.amount}</td>
                                    <td className="py-2 px-4 border-b">
                                        <select value={order.orderStatus} onChange={(e) => handleOrderStatusChange(order._id, e.target.value)} className="border rounded p-1">
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Packing">Packing</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Canceled">Canceled</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Refunded">Refunded</option>
                                            <option value="Partially Shipped">Partially Shipped</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {currentOrders.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-4">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-yellow-800 text-white rounded disabled:opacity-50">Previous</button>
                    <span className="mx-2">Page {currentPage} of {Math.ceil(totalOrders / ordersPerPage)}</span>
                    <button onClick={nextPage} disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)} className="px-3 py-1 bg-yellow-800 text-white rounded disabled:opacity-50">Next</button>
                </div></div>
            </div>
        </div>
        <MobileFooter />
        </>
    );
};

export default Order;