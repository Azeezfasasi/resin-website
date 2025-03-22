import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { UserContext } from '../context-api/user-context/UserContext';
import LoadingSpinner from '../LoadingSpinner';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const CustomerPieChart = () => {
    const [customerOrders, setCustomerOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const userId = user?.id;
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Order Statuses',
                data: [],
                backgroundColor: [],
            },
        ],
    });

    useEffect(() => {
        const fetchCustomerOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://resin-backend.onrender.com/api/orders?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer orders');
                }
                const data = await response.json();
                setCustomerOrders(data);

                if (data && data.length > 0) {
                    const statusCounts = {};
                    data.forEach(order => {
                        statusCounts[order.orderStatus] = (statusCounts[order.orderStatus] || 0) + 1;
                    });

                    const labels = Object.keys(statusCounts);
                    const dataPoints = Object.values(statusCounts);

                    const colors = generateUniqueColors(labels.length);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Order Statuses',
                                data: dataPoints,
                                backgroundColor: colors,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching customer orders:', error);
                alert('Failed to fetch customer orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomerOrders();
    }, [userId]);

    const generateUniqueColors = (count) => {
        const colors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(199, 211, 233, 0.5)',
            'rgba(179, 229, 252, 0.5)',
            'rgba(240, 98, 146, 0.5)',
            'rgba(129, 212, 250, 0.5)',
            'rgba(255, 183, 77, 0.5)',
            'rgba(174, 213, 129, 0.5)',
        ];

        if (count > colors.length) {
            console.warn("More order statuses than color available");
        }
        return colors.slice(0, count);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Order Status Distribution',
            },
        },
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            {customerOrders && customerOrders.length > 0 ? (
                <div className='w-full rounded h-full flex flex-col items-center mx-auto border'>
                    <Pie options={options} data={chartData} />
                </div>
            ) : (
                <p>No orders found for this customer.</p>
            )}
        </div>
    );
};

export default CustomerPieChart;