import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderStatusChart = ({ orders }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Order Statuses',
                data: [],
                backgroundColor: [], // Initialize as an empty array
            },
        ],
    });

    useEffect(() => {
        if (orders && orders.length > 0) {
            const statusCounts = {};
            orders.forEach(order => {
                statusCounts[order.orderStatus] = (statusCounts[order.orderStatus] || 0) + 1;
            });

            const labels = Object.keys(statusCounts);
            const data = Object.values(statusCounts);

            // Generate unique colors
            const colors = generateUniqueColors(labels.length);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Order Statuses',
                        data: data,
                        backgroundColor: colors, // Use the generated colors
                    },
                ],
            });
        }
    }, [orders]);

    const generateUniqueColors = (count) => {
        const colors = [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',   // Blue
            'rgba(255, 206, 86, 0.5)',   // Yellow
            'rgba(75, 192, 192, 0.5)',   // Green
            'rgba(153, 102, 255, 0.5)',  // Purple
            'rgba(255, 159, 64, 0.5)',   // Orange
            'rgba(199, 211, 233, 0.5)',  // Light Blue
            'rgba(179, 229, 252, 0.5)',  // Very Light Blue
            'rgba(240, 98, 146, 0.5)',  // Light Pink
            'rgba(129, 212, 250, 0.5)',  // Another Light Blue
            'rgba(255, 183, 77, 0.5)',  // Light Orange
            'rgba(174, 213, 129, 0.5)',  // Light Green

        ];

        // If you have more statuses than colors, you can expand this array or use a color generation library.
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

    return <div className='w-full h-full'><Bar options={options} data={chartData} /></div>
};

export default OrderStatusChart;