import React from 'react'
import { Bar } from 'react-chartjs-2'

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
}

const ReportsHorizontalChart = ({ categories, total }) => {
    const labels = categories.map(
        (c) => `${c.title} (${((c.total / total) * 100).toFixed(2)}%)`
    )
    const dataSet = categories.map((c) => c.total)
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Expense',
                data: dataSet,
                backgroundColor: '#007bff',
            },
        ],
    }

    return <Bar data={data} options={options} />
}

export default ReportsHorizontalChart
