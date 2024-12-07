let combinedData = JSON.parse(localStorage.getItem('combinedData'));
if (combinedData) {
    updateCharts();
} else {
    console.log('no combinedData')
    generatePieChart('stockTypes', [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        [25, 20, 15, 10, 10, 20]
    );

    generateBarChart('graph-inventory-value', [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        [250, 200, 150, 100, 100, 200],  // Example inventory values
    );
    
}

function updateCharts() {
    combinedData = JSON.parse(localStorage.getItem('combinedData'));
    calcTotalVal();
    calculateProductType();
    calcInventoryValue();
}

function calcTotalVal() {
    total = 0;
    combinedData.forEach(row => {
        total += row['sellingPrice'] * row['remainingCount'];
    });

    document.querySelector('#total-value').textContent = total.toLocaleString();
}

function calculateProductType() {
    const productsTotal = combinedData.reduce((acc, item) => {
        if (!acc[item['productCategory']]) {
            acc[item['productCategory']] = 0;
        }
        acc[item['productCategory']] += item['remainingCount'];
        return acc;
    }, {});

    const data = sortData(productsTotal);
    generatePieChart('stockTypes', data['categories'], data['values']);
}

function calcInventoryValue() {
    const inventoriesValue = combinedData.reduce((acc, item) => {
        if (!acc[item.productCategory]) {
            acc[item.productCategory] = 0;
        }
        acc[item.productCategory] += item.remainingCount * item.sellingPrice;
        return acc;
    }, {});

    const data = sortData(inventoriesValue);
    generateBarChart('graph-inventory-value', data['categories'], data['values']);

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
    new Chart(document.getElementById(id).getContext('2d'), {
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
    new Chart(document.getElementById(id).getContext('2d'), {
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
                        // stepSize: 50000,        // Set the interval between ticks (every 50 units)
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









new Chart(document.getElementById('graph-stock-overview').getContext('2d'), {
    type: 'bar',
    data: {
        labels: [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        datasets: [{
            label: 'Available Stock',
            data: [150, 100, 80, 120, 90, 110],  // Example available stock
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
            data: [25, 20, 15, 10, 10, 20],  // Example sold stock
            backgroundColor: '#22c1c3',
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
                    stepSize: 50,       // Set the interval between ticks (every 50 units)
                },
                
            }]
        },
        legend: {
            display: true   // Show the legend
        }
    }
});



new Chart(document.getElementById('chart-stock-movement').getContext('2d'), {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],  // Time periods
        datasets: [{
            label: 'Shampoo',
            data: [100, 120, 150, 130, 110, 90],  // Stock movement for Shampoo
            borderColor: '#fbb304',  // Purple border
            borderWidth: 2,
            fill: false,  // No fill below the line
            lineTension: 0,  // Sharp lines, no smoothing
            pointBackgroundColor: 'fbb304',  // Color of the dots (same as the line)
            pointRadius: 3,  // Size of the dots
        }, {
            label: 'Conditioner',
            data: [80, 100, 90, 110, 105, 95],  // Stock movement for Conditioner
            borderColor: '#d6bc48',  // Blue border
            borderWidth: 2,
            fill: false,  // No fill below the line
            lineTension: 0,  // Sharp lines, no smoothing
            pointBackgroundColor: '#d6bc48',  // Blue dots
            pointRadius: 3,  // Size of the dots
        }, {
            label: 'Hair Oil',
            data: [70, 90, 100, 95, 85, 80],  // Stock movement for Hair Oil
            borderColor: '#b1bd62',  // Teal border
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#b1bd62',  // Teal dots
            pointRadius: 3,
        }, {
            label: 'Hair Color',
            data: [120, 110, 100, 95, 90, 85],  // Stock movement for Hair Color
            borderColor: '#83be81',  // Light green border
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '83be81',  // Light green dots
            pointRadius: 3,
        }, {
            label: 'Styling Gel',
            data: [90, 85, 80, 75, 70, 65],  // Stock movement for Styling Gel
            borderColor: '#5ebf9b',  // Brown border
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#5ebf9b',  // Brown dots
            pointRadius: 3,
        }, {
            label: 'Others',
            data: [110, 100, 90, 85, 80, 75],  // Stock movement for Others
            borderColor: '#22c1c3',  // Green border
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#22c1c3',  // Green dots
            pointRadius: 3,
        }]
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Weeks'
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



let dataTable = new simpleDatatables.DataTable(document.querySelector('#productTable'));



// Filepond: ImgBB with server property
// FilePond.create( document.querySelector('.imgbb-filepond'), { 
//     allowImagePreview: false, 
//     server: {
//         process: (fieldName, file, metadata, load, error, progress, abort) => {
//             // We ignore the metadata property and only send the file

//             const formData = new FormData();
//             formData.append(fieldName, file, file.name);

//             const request = new XMLHttpRequest();
//             // you can change it by your client api key
//             request.open('POST', 'https://api.imgbb.com/1/upload?key=762894e2014f83c023b233b2f10395e2');

//             request.upload.onprogress = (e) => {
//                 progress(e.lengthComputable, e.loaded, e.total);
//             };

//             request.onload = function() {
//                 if (request.status >= 200 && request.status < 300) {
//                     load(request.responseText);
//                 }
//                 else {
//                     error('oh no');
//                 }
//             };

//             request.onreadystatechange = function() {
//                 if (this.readyState == 4) {
//                     if(this.status == 200) {
//                         let response = JSON.parse(this.responseText);
                        
//                         Toastify({
//                             text: "Success uploading to imgbb! see console f12",
//                             duration: 3000,
//                             close:true,
//                             gravity:"bottom",
//                             position: "right",
//                             backgroundColor: "#4fbe87",
//                         }).showToast();
            
//                         console.log(response);
//                     } else {
//                         Toastify({
//                             text: "Failed uploading to imgbb! see console f12",
//                             duration: 3000,
//                             close:true,
//                             gravity:"bottom",
//                             position: "right",
//                             backgroundColor: "#ff0000",
//                         }).showToast();   

//                         console.log("Error", this.statusText);
//                     }
//                 }
//             };

//             request.send(formData);
//         }
//     }
// });


FilePond.create(document.querySelector('.imgbb-filepond'), { 
    allowImagePreview: false, 
    server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
            // Read the file locally using FileReader
            const reader = new FileReader();

            reader.onload = function(event) {
                const fileContent = event.target.result;

                // Use a library like XLSX to parse Excel content
                const workbook = XLSX.read(fileContent, { type: 'binary' });
                
                // Example: Reading the first sheet
                const pricesSheet = workbook.Sheets[workbook.SheetNames[0]];
                const salesSheet = workbook.Sheets[workbook.SheetNames[1]];
                const inventorySheet = workbook.Sheets[workbook.SheetNames[2]];

                // Convert sheets to JSON for easier processing
                const salesData = XLSX.utils.sheet_to_json(salesSheet);
                const pricesData = XLSX.utils.sheet_to_json(pricesSheet);
                const inventoryData = XLSX.utils.sheet_to_json(inventorySheet);

                // Prepare the combined data array
                const combinedData = [];

                // Combine data by matching 'Product Name' and 'Product Category'
                pricesData.forEach(priceRow => {
                    const matchingInventoryRow = inventoryData.find(inventoryRow => 
                        inventoryRow['Product Name'] === priceRow['Product Name'] &&
                        inventoryRow['Product Category'] === priceRow['Product Category']
                    );

                    if (matchingInventoryRow) {
                        combinedData.push({
                            productName: priceRow['Product Name'], 
                            productCategory: priceRow['Product Category'],
                            purchasePrice: priceRow['Purchase Price'],
                            sellingPrice: priceRow['Selling Price'],
                            startingCount: matchingInventoryRow['Starting Count'],
                            in: matchingInventoryRow['IN'],
                            out: matchingInventoryRow['OUT'],
                            remainingCount: matchingInventoryRow['Remaining Count'],
                            variance: matchingInventoryRow['Variance']
                        });
                    }
                });

                // Output the JSON data
                console.log('Combined Data as JSON:', combinedData);

                localStorage.setItem('salesData', JSON.stringify(salesData));
                localStorage.setItem('combinedData', JSON.stringify(combinedData));

                updateCharts();

                // Show a success toast and log data
                Toastify({
                    text: "File successfully read!",
                    duration: 3000,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    backgroundColor: "#4fbe87",
                }).showToast();

                console.log('Excel Data:', salesData);
                load('File read successfully'); // Signal completion to FilePond
                
                calculateProductType();
            };

            reader.onerror = function() {
                Toastify({
                    text: "Error reading file!",
                    duration: 3000,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    backgroundColor: "#ff0000",
                }).showToast();

                error('Failed to read file');
            };

            // Read the file as binary for XLSX
            reader.readAsBinaryString(file);
        }
    }
});