function excelDateToJSDate(serial) {
    const excelEpoch = new Date(1900, 0, 1); // Excel starts counting from Jan 1, 1900
    const days = serial - 1; // Subtract 1 because Excel incorrectly includes Feb 29, 1900
    return new Date(excelEpoch.getTime() + days * 86400000); // Convert to JS Date
}

// Shows an error
function showError(errorMessage) {
    Toastify({
        text: errorMessage,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ff0000",
    }).showToast();
}

// Shows a success message
function showSuccess(successMessage) {
    Toastify({
        text: successMessage,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#4fbe87",
    }).showToast();
}

function showWarning(warningMessage) {
    Toastify({
        text: warningMessage,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ffbf00",
    }).showToast();
}

function sortData(jsonData) {
    // Step 1: Aggregate Remaining Count by Product Category
    // const categoryTotals = combinedData.reduce((acc, item) => {
    //     if (!acc[item[category]]) {
    //         acc[item[category]] = 0;
    //     }
    //     acc[item[category]] += item[value];
    //     return acc;
    // }, {});

    // Step 2: Sort Categories by Remaining Count
    const sortedCategories = Object.entries(jsonData)
        .sort((a, b) => b[1] - a[1]) // Sort descending by remaining count
        .map(([category, count]) => ({ category, count }));

    // Step 3: Determine Top 5 Categories and Group the Rest as "Others"
    const top5Categories = sortedCategories.slice(0, 5); // Get the top 5
    const othersTotal = sortedCategories.slice(5).reduce((sum, item) => sum + item.count, 0); // Sum the rest

    // Add "Others" to the list
    if (othersTotal > 0) {
        top5Categories.push({ category: 'Others', count: othersTotal });
    }

    // Step 4: Separate into Two Arrays
    const categories = top5Categories.map(item => item.category); // Array of category names
    const counts = top5Categories.map(item => item.count); // Array of corresponding counts

    return {
        'categories': categories,
        'values': counts
    };
}

function generatePieChart(id, labels, data) {
    return new Chart(document.getElementById(id).getContext('2d'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#fbb304',
                    '#fbd204',
                    '#fbdf04',
                    '#fbef04',
                    '#fbf404',
                    '#fbfb04'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Options: 'top', 'left', 'right', 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const data = tooltipItem.dataset.data[tooltipItem.dataIndex];
                            return `${tooltipItem.label}: ${data}%`;
                        }
                    }
                }
            }
        }
    });
}

function generateBarChart(id, labels, data) {
    return new Chart(document.getElementById(id).getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            
            datasets: [{
                label: 'Inventory Value',
                data: data,
                backgroundColor: [
                    '#fbb304',
                    '#fbd204',
                    '#fbdf04',
                    '#fbef04',
                    '#fbf404',
                    '#fbfb04'
                ],
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,   // Ensures the y-axis starts at zero
                        maxTicksLimit: 5,
                    } 
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            },
            legend: {
                display: false,
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const value = tooltipItem.yLabel; // Display actual value
                            return `${tooltipItem.label}: $${value}`;
                        }
                    }
                }
            }
        }
    });
}

function generateStackBarChart(id, labels, bottomData, topData) {
    return new Chart(document.getElementById(id).getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Available Stock',
                data: bottomData,
                backgroundColor: [
                    '#fbb304',
                    '#fbd204',
                    '#fbdf04',
                    '#fbef04',
                    '#fbf404',
                    '#fbfb04'
                ],
                stack: 'stack1',  // Stack group 1
            }, {
                label: 'Sold Stock',
                data: topData,
                backgroundColor: [
                    '#22c1c3',
                    '#22c2cd',
                    '#22c2d5',
                    '#22c2e0',
                    '#22c3ee',
                    '#22c3fb'
                ],
                stack: 'stack1',  // Stack group 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,  // Enable stacking on x-axis
                    gridLines: {
                        display: false  // Removes horizontal gridlines
                    }
                }],
                yAxes: [{
                    stacked: true,  // Enable stacking on y-axis
                    ticks: {
                        beginAtZero: true,  // Ensures the y-axis starts at zero
                        maxTicksLimit: 5,
                    },
                    
                }]
            },
            legend: {
                display: true   // Show the legend
            }
        }
    });
}

function generateLineChart(id, labels, datasets) {
    return new Chart(document.getElementById(id).getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,  // Time periods
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days'
                    },
                    ticks: {
                        autoSkip: true, // Enable auto-skipping
                        maxTicksLimit: 10, // Limit the number of visible labels
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Stock Count'
                    },
                    ticks: {
                        // beginAtZero: true  // Ensure y-axis starts at zero
                    }
                }]
            },
            legend: {
                display: true  // Show the legend
            }
        }
    });
}

function destroyCharts(charts) {
    charts.forEach(chart => {
        if (chart) chart.destroy();
    });
}