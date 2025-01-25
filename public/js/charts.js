
// Get CSS variable values
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--primary-color").trim();
const accentColor = rootStyles.getPropertyValue("--accent-color").trim();
const secondaryColor = rootStyles.getPropertyValue("--secondary-color").trim();

// Get the canvas element
const ctx = document.getElementById("activityChart").getContext("2d");

// Function to adjust chart height based on screen size
function adjustChartHeight() {
const canvasContainer = document.getElementById("canvas-container");
const screenWidth = window.innerWidth;

if (screenWidth <= 768) {
canvasContainer.style.height = "300px"; // Smaller height for medium screens
} else if (screenWidth <= 480) {
canvasContainer.style.height = "250px"; // Smaller height for small screens
} else {
canvasContainer.style.height = "400px"; // Default height for larger screens
}
}

// Adjust chart height on page load and window resize
window.addEventListener("load", adjustChartHeight);
window.addEventListener("resize", adjustChartHeight);

// Create the chart
const activityChart = new Chart(ctx, {
type: "line", // You can change to 'bar' for a bar chart
data: {
labels: [
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec",
], // Months
datasets: [
{
  label: "Profit",
  data: [5000, 6000, 7000, 8000, 6000, 7000, 7500, 8000, 9000, 9500, 10000, 11000],
  borderColor: primaryColor, // Primary color (Vibrant orange)
  backgroundColor: primaryColor + "80", // 50% opacity
  fill: true,
  tension: 0.4,
  borderWidth: 2,
  pointRadius: 4,
},
{
  label: "Interest",
  data: [2000, 3000, 4000, 3500, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000],
  borderColor: "rgba(0, 128, 255, 1)", // A blue for contrast
  backgroundColor: "rgba(0, 128, 255, 0.2)",
  fill: true,
  tension: 0.4,
  borderWidth: 2,
  pointRadius: 4,
},
{
  label: "Budget",
  data: [4000, 4500, 5000, 6000, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000],
  borderColor: "rgba(0, 255, 0, 1)", // Green for Budget
  backgroundColor: "rgba(0, 255, 0, 0.2)",
  fill: true,
  tension: 0.4,
  borderWidth: 2,
  pointRadius: 4,
},
{
  label: "Loss",
  data: [-2000, -1000, -500, -200, -100, 0, 100, 200, 400, 800, 1200, 1500],
  borderColor: "rgba(255, 0, 0, 1)", // Red for Loss
  backgroundColor: "rgba(255, 0, 0, 0.2)",
  fill: true,
  tension: 0.4,
  borderWidth: 2,
  pointRadius: 4,
},
],
},
options: {
responsive: true,
maintainAspectRatio: false, // Disable aspect ratio for better responsiveness
plugins: {
legend: {
  labels: {
    color: accentColor, // Change legend text color to white
    font: {
      size: window.innerWidth <= 480 ? 10 : 12, // Adjust font size for small screens
    },
  },
},
tooltip: {
  backgroundColor: primaryColor, // Tooltip background color
},
},
scales: {
x: {
  grid: {
    color: "rgba(255, 255, 255, 0.2)", // Light grid color for x-axis
  },
  ticks: {
    color: accentColor, // X-axis ticks color
    font: {
      size: window.innerWidth <= 480 ? 10 : 12, // Adjust font size for small screens
    },
  },
},
y: {
  grid: {
    color: "rgba(255, 255, 255, 0.2)", // Light grid color for y-axis
  },
  ticks: {
    color: accentColor, // Y-axis ticks color
    font: {
      size: window.innerWidth <= 480 ? 10 : 12, // Adjust font size for small screens
    },
  },
},
},
},
});
