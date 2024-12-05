
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    info: '#41B1F9',
    blue: '#3245D1',
    purple: 'rgb(153, 102, 255)',
    grey: '#EBEFF6'
};

var config1 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Balance",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 70, 10, 50, 20],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config2 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Revenue",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 800, 300, 400, 10, 50, 20],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config3 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Orders",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 200, 10, 540, 723],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};
var config4 = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [20, 40, 20, 70, 10, 5, 23],
                fill: false,
                pointBorderWidth: 100,
                pointBorderColor: "transparent",
                pointRadius: 3,
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "rgba(63,82,227,1)",
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: -10,
                top: 10,
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
};


// var ctxBar = document.getElementById("bar").getContext("2d");
// var myBar = new Chart(ctxBar, {
//     type: 'bar',
//     data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//         datasets: [{
//             label: 'Students',
//             backgroundColor: [chartColors.grey, chartColors.grey, chartColors.grey, chartColors.grey, chartColors.info, chartColors.blue, chartColors.grey],
//             data: [
//                 5,
//                 10,
//                 30,
//                 40,
//                 35,
//                 55,
//                 15,
//             ]
//         }]
//     },
//     options: {
//         responsive: true,
//         barRoundness: 1,
//         title: {
//             display: true,
//             text: "Students in 2020"
//         },
//         legend: {
//             display: false
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     suggestedMax: 40 + 20,
//                     padding: 10,
//                 },
//                 gridLines: {
//                     drawBorder: false,
//                 }
//             }],
//             xAxes: [{
//                 gridLines: {
//                     display: false,
//                     drawBorder: false
//                 }
//             }]
//         }
//     }
// });
// var line = document.getElementById("line").getContext("2d");
// var gradient = line.createLinearGradient(0, 0, 0, 400);
// gradient.addColorStop(0, 'rgba(50, 69, 209,1)');
// gradient.addColorStop(1, 'rgba(265, 177, 249,0)');

// var gradient2 = line.createLinearGradient(0, 0, 0, 400);
// gradient2.addColorStop(0, 'rgba(255, 91, 92,1)');
// gradient2.addColorStop(1, 'rgba(265, 177, 249,0)');

// var myline = new Chart(line, {
//     type: 'line',
//     data: {
//         labels: ['16-07-2018', '17-07-2018', '18-07-2018', '19-07-2018', '20-07-2018', '21-07-2018', '22-07-2018', '23-07-2018', '24-07-2018', '25-07-2018'],
//         datasets: [{
//             label: 'Balance',
//             data: [50, 25, 61, 50, 72, 52, 60, 41, 30, 45],
//             backgroundColor: "rgba(50, 69, 209,.6)",
//             borderWidth: 3,
//             borderColor: 'rgba(63,82,227,1)',
//             pointBorderWidth: 0,
//             pointBorderColor: 'transparent',
//             pointRadius: 3,
//             pointBackgroundColor: 'transparent',
//             pointHoverBackgroundColor: 'rgba(63,82,227,1)',
//         }, {
//             label: 'Balance',
//             data: [20, 35, 45, 75, 37, 86, 45, 65, 25, 53],
//             backgroundColor: "rgba(253, 183, 90,.6)",
//             borderWidth: 3,
//                 borderColor: 'rgba(253, 183, 90,.6)',
//             pointBorderWidth: 0,
//             pointBorderColor: 'transparent',
//             pointRadius: 3,
//             pointBackgroundColor: 'transparent',
//             pointHoverBackgroundColor: 'rgba(63,82,227,1)',
//         }]
//     },
//     options: {
//         responsive: true,
//         layout: {
//             padding: {
//                 top: 10,
//             },
//         },
//         tooltips: {
//             intersect: false,
//             titleFontFamily: 'Helvetica',
//             titleMarginBottom: 10,
//             xPadding: 10,
//             yPadding: 10,
//             cornerRadius: 3,
//         },
//         legend: {
//             display: true,
//         },
//         scales: {
//             yAxes: [
//                 {
//                     gridLines: {
//                         display: true,
//                         drawBorder: true,
//                     },
//                     ticks: {
//                         display: true,
//                     },
//                 },
//             ],
//             xAxes: [
//                 {
//                     gridLines: {
//                         drawBorder: false,
//                         display: false,
//                     },
//                     ticks: {
//                         display: false,
//                     },
//                 },
//             ],
//         },
//     }
// });

// let ctx1 = document.getElementById("canvas1").getContext("2d");
// let ctx2 = document.getElementById("canvas2").getContext("2d");
// let ctx3 = document.getElementById("canvas3").getContext("2d");
// let ctx4 = document.getElementById("canvas4").getContext("2d");
// var lineChart1 = new Chart(ctx1, config1);
// var lineChart2 = new Chart(ctx2, config2);
// var lineChart3 = new Chart(ctx3, config3);
// var lineChart4 = new Chart(ctx4, config4);

const ctx = document.getElementById('stockTypes').getContext('2d');
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            label: 'Color Distribution',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            }
        }
    }
});



new Chart(document.getElementById('graph-inventory-value').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [
            'Electronics', 'Furniture', 'Clothing', 'Toys', 'Books', 'Groceries', 'Tools', 'Appliances', 'Stationery'
        ],
        datasets: [
            {
                label: 'Inventory Stock',
                data: [120, 80, 150, 70, 50, 200, 90, 110, 60],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Inventory Stock Levels'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



new Chart(document.getElementById('graph-stock-overview').getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6', 'Product 7', 'Product 8', 'Product 9'],
        datasets: [
            {
                label: 'Available Stock',
                data: [120, 150, 90, 200, 300, 250, 180, 220, 160], // Data for available stock
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for available stock
                borderColor: 'rgba(75, 192, 192, 1)', // Border color for available stock
                borderWidth: 1,
                stack: 'stack1', // Ensure this dataset is part of a stack
            },
            {
                label: 'Sold Stock',
                data: [30, 50, 20, 40, 70, 100, 50, 60, 30], // Data for sold stock
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for sold stock
                borderColor: 'rgba(255, 99, 132, 1)', // Border color for sold stock
                borderWidth: 1,
                stack: 'stack1', // Ensure this dataset is part of the same stack
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true, // Enable stacking for the x-axis
            },
            y: {
                stacked: true, // Enable stacking for the y-axis
                beginAtZero: true // Ensure y-axis starts at zero
            }
        },
        plugins: {
            legend: {
                position: 'top' // Position the legend at the top
            }
        }
    }
});



const myChart = new Chart(document.getElementById('chart-stock-movement').getContext('2d'), {
    type: 'line', // Line chart type
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'], // Time labels (e.g., weekly)
        datasets: [
            {
                label: 'Product 1 Stock',
                data: [120, 130, 115, 140, 160, 150, 170, 180, 200], // Stock movement data for Product 1
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                fill: false, // No fill under the line
                tension: 0.1, // Smooth line curve
                borderWidth: 2,
                pointRadius: 3, // Point radius on the line
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
            },
            {
                label: 'Product 2 Stock',
                data: [150, 145, 160, 170, 190, 200, 210, 220, 230], // Stock movement data for Product 2
                borderColor: 'rgba(255, 99, 132, 1)', // Line color
                fill: false, // No fill under the line
                tension: 0.1, // Smooth line curve
                borderWidth: 2,
                pointRadius: 3, // Point radius on the line
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point color
            },
            {
                label: 'Product 3 Stock',
                data: [90, 100, 95, 120, 130, 125, 140, 150, 160], // Stock movement data for Product 3
                borderColor: 'rgba(54, 162, 235, 1)', // Line color
                fill: false, // No fill under the line
                tension: 0.1, // Smooth line curve
                borderWidth: 2,
                pointRadius: 3, // Point radius on the line
                pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
            },
            // Add more datasets for Products 4 to 9 as needed
            {
                label: 'Product 4 Stock',
                data: [200, 210, 220, 230, 240, 250, 260, 270, 280],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'Product 5 Stock',
                data: [300, 290, 280, 275, 260, 250, 240, 235, 230],
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            },
            {
                label: 'Product 6 Stock',
                data: [250, 260, 270, 280, 290, 295, 300, 310, 320],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Product 7 Stock',
                data: [180, 185, 200, 210, 220, 230, 240, 250, 260],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Product 8 Stock',
                data: [220, 230, 240, 245, 250, 260, 270, 275, 280],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'Product 9 Stock',
                data: [160, 170, 180, 190, 200, 210, 220, 230, 240],
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false,
                tension: 0.1,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (Weeks)', // X-axis title
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Stock Level', // Y-axis title
                },
                beginAtZero: true, // Ensure the Y-axis starts at zero
            }
        },
        plugins: {
            legend: {
                position: 'top', // Position the legend at the top
            },
            tooltip: {
                mode: 'index', // Show the tooltip for all points at the same x-axis position
                intersect: false, // Show tooltip even if cursor is not directly on the line
            }
        }
    }
});



let dataTable = new simpleDatatables.DataTable(document.querySelector('#productTable'));