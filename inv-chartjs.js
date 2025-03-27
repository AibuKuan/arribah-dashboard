let resetBtn = document.getElementById('reset');

const SHEETS = {
    PRICES: 'PRICES',
    TRANSACTIONS: 'TRANSACTIONS',
    INVENTORY: 'INVENTORY'
}

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
    // updateCharts();
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

resetBtn.addEventListener('click', () => {
    console.log('clicked');
    localStorage.clear();
    combinedData = [];
    salesData = [];
    initialStocks = {};
    destroyCharts([stockTypesChart, graphInventoryValue, graphStockOverview, chartStockMovement]);
    // Reset how filepond looks
    pond.addFile(null);
    pond.setMetadata(null);
    showSuccess('Data reset successfully!');
});

const pond = FilePond.create(document.querySelector('.imgbb-filepond'), { 
    allowImagePreview: false, 
    allowRevert: false,
    server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
            const readFile = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };

                    reader.onerror = (error) => {
                        reject(error);
                    };

                    reader.readAsBinaryString(file);
                });
            }

            const processFile = (fileContent) => {
                const workbook = XLSX.read(fileContent, { type: 'binary' });

                // Example: Reading the first sheet
                const pricesSheet = workbook.Sheets[SHEETS.PRICES];
                const salesSheet = workbook.Sheets[SHEETS.TRANSACTIONS];
                const inventorySheet = workbook.Sheets[SHEETS.INVENTORY];

                // Convert sheets to JSON for easier processing
                const salesData = XLSX.utils.sheet_to_json(salesSheet);
                const pricesData = XLSX.utils.sheet_to_json(pricesSheet);
                const inventoryData = XLSX.utils.sheet_to_json(inventorySheet);

                // Check if data is empty
                if (salesData.length === 0) {
                    error(); // Turn filepond into error state
                    showError('No transactions found!'); // Show toast message
                    return; // Stop processing
                }
                if (pricesData.length === 0) {
                    error()
                    showError('No prices found!');
                    return;
                }
                if (inventoryData.length === 0) {
                    error();
                    showError('No inventory found!');
                    return;
                }

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
                    } else {
                        // If date is missing, show error
                        error()
                        showError('Date Column is missing or improper format!');
                        return;
                    }
                    return row;
                });

                // Prepare the combined data array
                const combinedData = [];

                // Combine data by matching 'Product Name' and 'Product Category'
                pricesData.forEach(priceRow => {
                    const matchingInventoryRow = inventoryData.find(inventoryRow => 
                        inventoryRow['Product Name'] === priceRow['Product Name']
                        // inventoryRow['Product Category'] === priceRow['Product Category']
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

                updateCharts()
                .then(resolve => {
                    showSuccess('Charts updated successfully!');
                }, reject => {
                    showError('Error updating charts!');
                });

                // Show a success toast and log data
                showSuccess('File successfully read!');

                console.log('Sales Data:', salesData);
                load('File read successfully'); // Signal completion to FilePond
                
                calculateProductType();
            }

            readFile(file)
            .then(fileContent => processFile(fileContent))
            .catch(error => showError(error));
        }
    }
});

function updateCharts() {
    return new Promise((resolve, reject) => {
        destroyCharts([stockTypesChart, graphInventoryValue, graphStockOverview, chartStockMovement]);
    
        combinedData = JSON.parse(localStorage.getItem('combinedData'));
        salesData = JSON.parse(localStorage.getItem('salesData'));
        
        try {
            calcTotalVal();
            calculateProductType();
            calcInventoryValue();
            calcStockOverview();
            calcStockMovement();
            resolve('Charts updated successfully!');
        } catch (error) {
            reject(error);
        }
    });
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



function calcStockMovement() {
    let currentStocks = {...initialStocks};

    // Step 1: Group sales by date and category
    let groupedData = salesData.reduce((acc, item) => {
        let date = item.DATE.split("T")[0]; // Extract date only
        let category = item["PRODUCT CATEGORY"];
    
        if (!acc[date]) acc[date] = {...currentStocks};
        console.log(acc[date]);
    
        if (item['TRANSACTION TYPE'] === 'SOLD') {
            acc[date][category] = (acc[date][category] || 0) - item['QUANTITY'];
        } else {
            acc[date][category] = (acc[date][category] || 0) + item['QUANTITY'];
        }

        // Update currentStocks to reflect the new state for the date
        currentStocks = acc[date];

        return acc;
    }, {});

    // Step 2: Identify the Top 5 Categories Based on the Last Day
    let lastDate = Object.keys(groupedData).sort().slice(-1)[0];
    let lastDayData = Object.entries(groupedData[lastDate]);

    // Sort categories by stock count (descending) on the last day
    lastDayData.sort(([, stockA], [, stockB]) => stockB - stockA);

    // Extract the top 5 categories
    let topCategories = lastDayData.slice(0, 5).map(([category]) => category);

    // Step 3: Reorganize categories into top 5 + "Others" for every date
    Object.keys(groupedData).forEach(date => {
        let categories = Object.entries(groupedData[date]);
        let aggregated = {};

        categories.forEach(([category, stock]) => {
            if (topCategories.includes(category)) {
                aggregated[category] = stock;
            } else {
                aggregated["Others"] = (aggregated["Others"] || 0) + stock;
            }
        });

        groupedData[date] = aggregated;
    });

    console.log('Grouped data with top 5 and others:', groupedData);

    // Step 4: Get sorted unique dates
    let uniqueDates = Object.keys(groupedData).sort();

    // Step 5: Collapse dates into ranges if they exceed 10
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

    // Step 6: Prepare data for Chart.js
    const colorPalette = ['#fbb304', '#d6bc48', '#b1bd62', '#83be81', '#5ebf9b', '#22c1c3'];
    let categories = [...topCategories, "Others"];

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