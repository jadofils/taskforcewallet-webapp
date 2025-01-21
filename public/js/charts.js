const ctx = document.getElementById('activityChart').getContext('2d');

const activityChart = new Chart(ctx, {
    type: 'line', // You can change to 'bar' for a bar chart
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months
        datasets: [{
            label: 'Profit',
            data: [5000, 6000, 7000, 8000, 6000, 7000, 7500, 8000, 9000, 9500, 10000, 11000],
            borderColor: 'rgba(255, 114, 0, 1)', // Primary color (Vibrant orange)
            backgroundColor: 'rgba(255, 114, 0, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
        },
        {
            label: 'Interest',
            data: [2000, 3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000],
            borderColor: 'rgba(0, 128, 255, 1)', // A blue for contrast
            backgroundColor: 'rgba(0, 128, 255, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
        },
        {
            label: 'Budget',
            data: [4000, 4500, 5000, 6000, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000],
            borderColor: 'rgba(0, 255, 0, 1)', // Green for Budget
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
        },
        {
            label: 'Loss',
            data: [-2000, -1000, -500, -200, -100, 0, 100, 200, 400, 800, 1200, 1500],
            borderColor: 'rgba(255, 0, 0, 1)', // Red for Loss
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: var(--accent-color) // Change legend text color to white
                }
            },
            tooltip: {
                backgroundColor: var(--primary-color) // Tooltip background color
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Light grid color for x-axis
                },
                ticks: {
                    color: var(--accent-color) // X-axis ticks color
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Light grid color for y-axis
                },
                ticks: {
                    color: var(--accent-color) // Y-axis ticks color
                }
            }
        }
    }
});