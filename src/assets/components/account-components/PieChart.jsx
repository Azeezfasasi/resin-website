import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie instead of Bar
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'; // Import ArcElement

ChartJS.register(ArcElement, Title, Tooltip, Legend); // Register ArcElement

const PieChart = ({ orders }) => {
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
        if (orders && orders.length > 0) {
            const statusCounts = {};
            orders.forEach(order => {
                statusCounts[order.orderStatus] = (statusCounts[order.orderStatus] || 0) + 1;
            });

            const labels = Object.keys(statusCounts);
            const data = Object.values(statusCounts);

            const colors = generateUniqueColors(labels.length);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Order Statuses',
                        data: data,
                        backgroundColor: colors,
                    },
                ],
            });
        }
    }, [orders]);

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

    return <div className='w-full rounded h-full flex flex-col items-center mx-auto border'><Pie options={options} data={chartData} /></div> // Render Pie chart
};

export default PieChart;