let combinedData = JSON.parse(localStorage.getItem('combinedData'));
let salesData = JSON.parse(localStorage.getItem('salesData'));
let initialStocks = {};

let stockTypesChart;
let graphInventoryValue; 
let graphStockOverview;
let chartStockMovement;

if (combinedData && salesData) {
    console.log(combinedData);
    console.log(salesData);
    updateCharts();
} else {
    stockTypesChart = generatePieChart('stockTypes', [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        [25, 20, 15, 10, 10, 20]
    );

    graphInventoryValue = generateBarChart('graph-inventory-value', [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        [250, 200, 150, 100, 100, 200],  // Example inventory values
    );
    
    graphStockOverview = generateStackBarChart('graph-stock-overview', [
            'Shampoo', 
            'Conditioner', 
            'Hair Oil', 
            'Hair Color', 
            'Styling Gel', 
            'Others'
        ],
        [150, 100, 80, 120, 90, 110],
        [25, 20, 15, 10, 10, 20]
    );

    chartStockMovement = generateLineChart('chart-stock-movement', 
        [
            "2023-01-01", "2023-02-14", "2023-03-22", "2023-04-30", "2023-06-15",
            "2023-07-20", "2023-08-12", "2023-09-18", "2023-10-05", "2023-11-10"
        ],
        [{
            label: 'Shampoo',
            data: [ 120, 150, 135, 125, 160, 145, 180, 190, 210, 175 ],
            borderColor: '#fbb304',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#fbb304',
            pointRadius: 3,
        },
        {
            label: 'Conditioner',
            data: [ 80, 75, 85, 90, 110, 100, 95, 105, 120, 115 ],
            borderColor: '#d6bc48',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#d6bc48',
            pointRadius: 3,
        },
        {
            label: 'Hair Oil',
            data: [ 50, 55, 70, 65, 85, 90, 95, 100, 120, 110 ],
            borderColor: '#b1bd62',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#b1bd62',
            pointRadius: 3,
        },
        {
            label: 'Hair Color',
            data: [ 30, 35, 40, 45, 50, 60, 75, 80, 95, 90 ],
            borderColor: '#83be81',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#83be81',
            pointRadius: 3,
        },
        {
            label: 'Styling Gel',
            data: [ 70, 85, 95, 100, 115, 120, 110, 125, 140, 130 ],
            borderColor: '#5ebf9b',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#5ebf9b',
            pointRadius: 3,
        },
        {
            label: 'Others',
            data: [ 60, 65, 70, 80, 75, 85, 95, 110, 120, 125 ],
            borderColor: '#22c1c3',
            borderWidth: 2,
            fill: false,
            lineTension: 0,
            pointBackgroundColor: '#22c1c3',
            pointRadius: 3,
        }]
    );
}

function updateCharts() {
    if (stockTypesChart && graphInventoryValue && graphStockOverview && chartStockMovement) {
        stockTypesChart.destroy()
        graphInventoryValue.destroy()
        graphStockOverview.destroy()
        chartStockMovement.destroy()
    }

    combinedData = JSON.parse(localStorage.getItem('combinedData'));
    
    calcTotalVal();
    calculateProductType();
    calcInventoryValue();
    calcStockOverview();
    calcStockMovement();
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
    stockTypesChart = generatePieChart('stockTypes', data['categories'], data['values']);
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
    graphInventoryValue = generateBarChart('graph-inventory-value', data['categories'], data['values']);

}

function calcStockOverview() {
    const inventoriesValue = combinedData.reduce((acc, item) => {
        if (!acc[item.productCategory]) {
            acc[item.productCategory] = {'available': 0, 'sold': 0, 'totalStartingCount': 0};
        }
        acc[item.productCategory]['available'] += item.remainingCount;
        acc[item.productCategory]['sold'] += item.startingCount - item.remainingCount;
        acc[item.productCategory]['totalStartingCount'] += item.startingCount; // needed for line chart
        return acc;
    }, {});

    Object.entries(inventoriesValue).forEach(([productType, data]) => {
        initialStocks[productType] = data.totalStartingCount;
    });

    // Transform into an array of objects for sorting
    const inventoryArray = Object.keys(inventoriesValue).map(category => ({
        productCategory: category,
        soldCount: inventoriesValue[category].sold,
        remainingCount: inventoriesValue[category].available,
    }));

    // Sort by highest remaining count
    inventoryArray.sort((a, b) => b.remainingCount - a.remainingCount);

    // Separate the top 5 categories and combine the rest into "Others"
    const top5 = inventoryArray.slice(0, 5);
    const others = inventoryArray.slice(5);

    // Aggregate "Others" data
    const othersAggregated = others.reduce(
        (acc, item) => {
            acc.soldCount += item.soldCount;
            acc.remainingCount += item.remainingCount;
            return acc;
        },
        { productCategory: 'Others', soldCount: 0, remainingCount: 0 }
    );

    // Add "Others" to the top 5
    const finalInventory = [...top5, othersAggregated];

    // Separate into arrays
    const productCategories = finalInventory.map(item => item.productCategory);
    const soldCounts = finalInventory.map(item => item.soldCount);
    const remainingCounts = finalInventory.map(item => item.remainingCount);

    graphStockOverview = generateStackBarChart('graph-stock-overview', productCategories, remainingCounts, soldCounts);
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

function calcStockMovement() {
    let currentStocks = {...initialStocks};

    // Step 1: Group sales by date and category
    let groupedData = salesData.reduce((acc, item) => {
        let date = item.DATE.split("T")[0]; // Extract date only
        let category = item["PRODUCT CATEGORY"];
    
        if (!acc[date]) acc[date] = {...currentStocks};
    
        if (item['TRANSACTION TYPE'] == 'sold') {
            acc[date][category] = (acc[date][category] || 0) - item['QUANTITY'];
        } else {
            acc[date][category] = (acc[date][category] || 0) + item['QUANTITY'];
        }

        // Update currentStocks to reflect the new state for the date
        currentStocks = acc[date];

        return acc;
    }, {});

    // Step 2: Reorganize categories into top 5 + "others" for every date
    Object.keys(groupedData).forEach(date => {
        let categories = Object.entries(groupedData[date]);

        // Sort categories by stock count (descending)
        categories.sort(([, stockA], [, stockB]) => stockB - stockA);

        // Keep top 5, sum the rest into "others"
        let top5 = categories.slice(0, 5);
        let others = categories.slice(5);
        let aggregated = {};

        top5.forEach(([category, stock]) => {
            aggregated[category] = stock;
        });

        if (others.length > 0) {
            aggregated["Others"] = others.reduce((sum, [, stock]) => sum + stock, 0);
        }

        groupedData[date] = aggregated;
    });

    console.log('grouped data with others:', groupedData);
    
    // Step 3: Get sorted unique dates
    let uniqueDates = Object.keys(groupedData).sort();
    
    // Step 4: Collapse dates into ranges if they exceed 10
    function collapseDatesAndAggregate(dates, data, maxCount) {
        if (dates.length <= maxCount) return { dates, aggregatedData: data };
    
        let interval = Math.ceil(dates.length / maxCount);
        let collapsedDates = [];
        let aggregatedData = {};
    
        for (let i = 0; i < dates.length; i += interval) {
            let end = dates[Math.min(i + interval - 1, dates.length - 1)];
            collapsedDates.push(end);
            aggregatedData[end] = data[end];
        }
    
        return { dates: collapsedDates, aggregatedData };
    }
    
    let { dates: limitedDates, aggregatedData } = collapseDatesAndAggregate(uniqueDates, groupedData, 10);
    
    // Step 5: Prepare data for Chart.js
    let categories = [...new Set(Object.values(groupedData).flatMap(dateData => Object.keys(dateData)))];

    // Define your custom color palette
    const colorPalette = ['#fbb304', '#d6bc48', '#b1bd62', '#83be81', '#5ebf9b', '#22c1c3'];

    // Prepare the datasets using the color palette
    let datasets = categories.map((category, index) => ({
        label: category,
        data: limitedDates.map(date => aggregatedData[date][category] || 0),
        borderColor: colorPalette[index % colorPalette.length],
        borderWidth: 2,
        fill: false,
        lineTension: 0,
        pointBackgroundColor: colorPalette[index % colorPalette.length],
        pointRadius: 3,
    }));
    

    // Debugging: Log datasets and labels to verify alignment
    console.log("Labels:", limitedDates);
    console.log("Datasets:", datasets);
    console.log('Aggregated data with others:', aggregatedData);

    chartStockMovement = generateLineChart('chart-stock-movement', limitedDates, datasets);
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












// let dataTable = new simpleDatatables.DataTable(document.querySelector('#productTable'));



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

                // Process the data to convert the DATE column
                const processedSalesData = salesData.map(row => {
                    if (row['DATE']) {
                        // If the DATE is a serial number (check if it's a number)
                        if (typeof row['DATE'] === 'number') {
                            row['DATE'] = excelDateToJSDate(row['DATE']);
                        } else if (typeof row['DATE'] === 'string' && !isNaN(Date.parse(row['DATE']))) {
                            // If it's a string that can be parsed as a date, convert it
                            row['DATE'] = new Date(row['DATE']);
                        }
                    }
                    return row;
                });

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

                localStorage.setItem('salesData', JSON.stringify(processedSalesData));
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

                console.log('Sales Data:', salesData);
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

function excelDateToJSDate(serial) {
    const excelEpoch = new Date(1900, 0, 1); // Excel starts counting from Jan 1, 1900
    const days = serial - 1; // Subtract 1 because Excel incorrectly includes Feb 29, 1900
    return new Date(excelEpoch.getTime() + days * 86400000); // Convert to JS Date
}