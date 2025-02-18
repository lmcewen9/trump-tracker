// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://api.lukemcewen.com');
        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to group consecutive identical values
function groupDataByValue(data, key) {
    let groupedLabels = [];
    let groupedValues = [];
    
    let start = new Date(data[0].date).toLocaleDateString();
    let prevValue = data[0][key];
    
    for (let i = 1; i < data.length; i++) {
        let currValue = data[i][key];
        let currDate = new Date(data[i].date).toLocaleDateString();
        
        if (currValue !== prevValue) {
            // Save the grouped entry
            groupedLabels.push(start === currDate ? start : `${start} - ${currDate}`);
            groupedValues.push(prevValue);
            
            // Reset for next grouping
            start = currDate;
            prevValue = currValue;
        }
    }
    
    // Add the last entry
    groupedLabels.push(start);
    groupedValues.push(prevValue);

    return { labels: groupedLabels, values: groupedValues };
}

// Function to create or update the graph
let myChart;
async function createGraph() {
    const data = await fetchData();
    if (data.length === 0) return;

    console.log(data); // Debugging output

    // Process data by grouping consecutive identical values
    const favorableData = groupDataByValue(data, 'favorable');
    const unfavorableData = groupDataByValue(data, 'unfavorable');
    const eggsData = groupDataByValue(data, 'eggs');
    const gasData = groupDataByValue(data, 'gas');
    const bananasData = groupDataByValue(data, 'bananas');
    const coffeeData = groupDataByValue(data, 'coffee');
    const chocolateData = groupDataByValue(data, 'chocolate');

    // Ensure all datasets have the same x-axis labels
    const x_axis = favorableData.labels;

    // Get canvas context
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy previous chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Create the new chart
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_axis,
            datasets: [
                {
                    label: 'Favorable Percent',
                    data: favorableData.values,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Unfavorable Percent',
                    data: unfavorableData.values,
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Egg Price',
                    data: eggsData.values,
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gas Price',
                    data: gasData.values,
                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Banana Price',
                    data: bananasData.values,
                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Coffee Price',
                    data: coffeeData.values,
                    backgroundColor: 'rgba(128, 0, 128, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Chocolate Price',
                    data: chocolateData.values,
                    backgroundColor: 'rgba(150, 75, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false, // Prevents skipping labels
                        maxRotation: 45, // Prevents excessive rotation
                        minRotation: 0
                    }
                }
            }
        }
    });
}

// Initial graph creation
createGraph();
