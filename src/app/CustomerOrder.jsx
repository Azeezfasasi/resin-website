import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import LoadingSpinner from '../assets/components/LoadingSpinner';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import resin from '../assets/images/resin.png';

const CustomerOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                setTotalOrders(sortedOrders.length);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalOrders / ordersPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const printOrder = () => {
        window.print();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Helmet>
                <title>Orders - Resin By Saidat</title>
            </Helmet>
            <div className='w-full flex flex-row justify-start mb-[100px] lg:mb-0'>
                <div className='w-[0%] lg:w-[20%]'>
                    <MyAccountMenu />
                </div>
                <div className='w-full flex flex-col overflow-x-hidden'>
                    <AccountHeader />
                    <div className="w-[95%] lg:w-[80%] mx-auto mt-8 lg:h-[80vh] overflow-y-auto overflow-x-hidden">
                        <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
                            <p className="font-semibold">Total Orders: <span className="text-blue-600">{totalOrders}</span></p>
                            <div className="flex items-center">
                                <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-yellow-800 text-white rounded disabled:opacity-50">Previous</button>
                                <span className="mx-2">Page {currentPage} of {Math.ceil(totalOrders / ordersPerPage)}</span>
                                <button onClick={nextPage} disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)} className="px-3 py-1 bg-yellow-800 text-white rounded disabled:opacity-50">Next</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 border-b">Order Number</th>
                                        <th className="py-2 px-4 border-b">Customer Name</th>
                                        <th className="py-2 px-4 border-b">Order Date</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                                            <td className="py-2 px-4 border-b">{order.firstName} {order.lastName || 'Ordered Via Whatsapp'}</td>
                                            <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b">₦{order.amount}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button onClick={() => openModal(order)} className="bg-yellow-900 hover:bg-yellow-600 text-white text-[10px] md:text-[14px] font-bold py-2 px-4 rounded">View</button>
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
                        </div>
                    </div>
                </div>
            </div>
             
            {/* Order Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-scroll h-[100vh] pt-[50px] pb-[50px] z-[99999]">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[95%] lg:w-full max-w-2xl mt-[120px]">
                        <div className='flex flex-row-reverse justify-between items-center mb-[30px]'>
                            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                            <img src={resin} alt="Resin Logo" className='ml-[-40px]' />
                        </div>
                        {selectedOrder && (
                            <div>
                                <div className='w-full lg:w-[60%] flex flex-col items-center border py-2 px-2 mx-auto bg-yellow-100 rounded mb-3'>
                                    <div className='text-[18px] lg:text-[26px]'>
                                        Order Status: <span className='font-bold'> {selectedOrder.orderStatus}</span>
                                    </div>
                                </div>
                                <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                                <p><strong>Customer Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName || 'Ordered Via Whatsapp'}</p>
                                <p><strong>Email:</strong> {selectedOrder.email || 'Ordered Via Whatsapp'}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phone || 'Ordered Via Whatsapp'}</p>
                                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                                <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
                                {selectedOrder.productImage && (
                                    <div className="mt-4">
                                        <img src={selectedOrder.productImage} alt="dfff" className="w-full h-auto max-h-64 object-contain" />
                                    </div>
                                )}
                                <p><strong>Amount:</strong> ₦{selectedOrder.amount}</p>
                                <p><strong>Shipping Address:</strong> {selectedOrder.streetAddress || 'Ordered Via Whatsapp'}, {selectedOrder.townCity}, {selectedOrder.state}, {selectedOrder.country}</p>
                                <p><strong>State:</strong> {selectedOrder.state || 'Ordered Via Whatsapp'}</p>
                                <p><strong>Town:</strong> {selectedOrder.townCity || 'Ordered Via Whatsapp'}</p>
                                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'Not Specified'}</p>
                                <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                                <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                {selectedOrder.productImage && (
                                    <div className="mt-4">
                                        <img src={selectedOrder.productImage} alt="dfff" className="w-full h-auto max-h-64 object-contain" />
                                    </div>
                                )}
                                <div className="flex justify-end mt-4">
                                    <button onClick={printOrder} className="bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2">
                                        <i class="fa-solid fa-print"></i> Print
                                    </button>
                                    <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )}
            
export default CustomerOrder;