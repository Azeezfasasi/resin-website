import React, { useState, useEffect, useContext } from 'react';
import exportproduct from '../../images/exportproduct.svg';
import ordericon from '../../images/ordericon.svg';
import soldicon from '../../images/soldicon.svg';
import customericon from '../../images/customericon.svg';
import { Link } from 'react-router-dom';
import { ProductContext } from "../context-api/product-context/ProductContext";
import OrderStatusChart from './OrderChart';
import LoadingSpinner from '../LoadingSpinner';
import PieChart from './PieChart';
import CustomerPieChat from './CustomerPieChart';
import CustomerPieChart from './CustomerPieChart';
import { UserContext } from '../context-api/user-context/UserContext';
import Message from '../../../app/Message';
import CustomerOrderCount from './CustomerOrderCount';


function TotalSales() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    
    const { products} = useContext(ProductContext);
    // Ensure products is always an array
    const productList = Array.isArray(products) ? products : [];

    useEffect(() => {
        // Fetch total orders
        fetch('https://resin-backend.onrender.com/api/orders/count') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setTotalOrders(data.count))
            .catch(error => console.error('Error fetching total orders:', error));
    }, []);

    // Fetch User roles
    useEffect(() => {
      const fetchRoleCounts = async () => {
            setLoading(true);
          try {
              const response = await fetch('https://resin-backend.onrender.com/api/users/role-counts'); // Adjust URL as needed
              if (!response.ok) {
                  throw new Error('Failed to fetch role counts');
              }
              const data = await response.json();
              setCustomerCount(data.customerCount);
              setAdminCount(data.adminCount);
          } catch (error) {
              console.error('Error fetching role counts:', error);
          } finally {
            setLoading(false);
        }
      };

      fetchRoleCounts();
  }, []);

//   Fetch Order Status
  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://resin-backend.onrender.com/api/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };

    fetchOrders();
}, []);

const printDashboard = () => {
    window.print();
};

if (loading) {
    return <LoadingSpinner />;

}

return (
    <>
    <div className='w-[100%] md:w-[95%] flex flex-col items-center justify-start gap-8 border rounded-[20px] h-[80vh] relative bg-[#ffffff] overflow-y-scroll overflow-x-hidden mt-[20px] p-[20px] md:ml-[10px] mb-[100px] lg:mb-0'>
        {/* Top section */}
        <div className='flex flex-row items-center justify-between w-full h-[fit-content]'>
            <div className='flex flex-col'>
                <div className="text-left font-xl-semibold-font-family text-xl-semibold-font-size leading-xl-semibold-line-height font-xl-semibold-font-weight text-yellow-900">Welcome {user.firstName}</div>
            </div>
        </div>

        {/* Cards section */}
        <div className='w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-5'>
            
            {/* Total Order Card*/}
            {user?.role === "Admin" && (
                <Link to="/app/order" className='bg-[#fff4de] rounded-2xl w-[80%] md:w-[25%] h-[184px] relative'>
                    <div className="bg-[#ff947a] rounded-[50%] w-10 h-10 absolute left-5 top-5 flex flex-row items-center justify-center">
                        <img className="w-5 h-5 overflow-visible" src={ordericon} alt="Order Icon" />
                    </div>
                    <div className="text-greys-blue-grey-900 text-left font-2xl-semibold-font-family text-2xl-semibold-font-size leading-2xl-semibold-line-height font-2xl-semibold-font-weight absolute left-5 top-[76px]">{totalOrders}</div>
                    <div className="text-[#425166] text-left font-base-medium-font-family text-base-medium-font-size leading-base-medium-line-height font-base-medium-font-weight absolute left-5 top-[116px]">Total Order</div>
                </Link>
            )}

            {/* Number of Product Card */}
            {user?.role === "Admin" && (
                <Link to="/app/product" className='bg-[#dcfce7] rounded-2xl w-[80%] md:w-[25%] h-[184px] relative'>
                    <div className="bg-[#3cd856] rounded-[50%] w-10 h-10 absolute left-5 top-5 flex flex-row items-center justify-center">
                        <img className="w-5 h-5 overflow-visible" src={soldicon} alt="Sold Icon" />
                    </div>
                    <div className="text-greys-blue-grey-900 text-left font-2xl-semibold-font-family text-2xl-semibold-font-size leading-2xl-semibold-line-height font-2xl-semibold-font-weight absolute left-5 top-[76px]">{productList.length}</div>
                    <div className="text-[#425166] text-left font-base-medium-font-family text-base-medium-font-size leading-base-medium-line-height font-base-medium-font-weight absolute left-5 top-[116px]">No of Product</div>
                </Link>
            )}

            {/* Number of Customers Card */}
            {user?.role === "Admin" && (
                <Link to="/app/usermanagement" className='bg-[#f3e8ff] rounded-2xl w-[80%] md:w-[25%] h-[184px] relative'>
                    <div className="bg-[#151d48] rounded-[50%] w-10 h-10 absolute left-5 top-5 flex flex-row items-center justify-center">
                        <img className="w-5 h-5 overflow-visible" src={customericon} alt="Customer Icon" />
                    </div>
                    <div className="text-greys-blue-grey-900 text-left font-2xl-semibold-font-family text-2xl-semibold-font-size leading-2xl-semibold-line-height font-2xl-semibold-font-weight absolute left-5 top-[76px]">{customerCount}</div>
                    <div className="text-[#425166] text-left font-base-medium-font-family text-base-medium-font-size leading-base-medium-line-height font-base-medium-font-weight absolute left-5 top-[116px]">No of Customers</div>
                </Link>
            )}

            {/* Number of Customers Card */}
            {user?.role === "Admin" && (
                <Link to="/app/usermanagement" className='bg-[#ffe2e5] rounded-2xl w-[80%] md:w-[25%] h-[184px] relative'>
                    <div className="bg-[#151d48] rounded-[50%] w-10 h-10 absolute left-5 top-5 flex flex-row items-center justify-center">
                        <img className="w-5 h-5 overflow-visible" src={customericon} alt="Customer Icon" />
                    </div>
                    <div className="text-greys-blue-grey-900 text-left font-2xl-semibold-font-family text-2xl-semibold-font-size leading-2xl-semibold-line-height font-2xl-semibold-font-weight absolute left-5 top-[76px]">{adminCount}</div>
                    <div className="text-[#425166] text-left font-base-medium-font-family text-base-medium-font-size leading-base-medium-line-height font-base-medium-font-weight absolute left-5 top-[116px]">No of Admins</div>
                </Link>
            )}
        </div>
        {/* <OrderStatusChart orders={orders} /> */}
        {user?.role === "Admin" && (
            <PieChart orders={orders} />
        )}

        {user?.role === "Customer" && (
            <CustomerOrderCount />
        )}

        {user?.role === "Customer" && (
            <CustomerPieChart />
        )}
    </div>
    </>
    );
}

export default TotalSales;
