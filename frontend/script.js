
// Fetch data from the API
async function fetchData() {
    const response = await fetch('https://api.lukemcewen.com');
    if (!response.ok) {
        console.error('Failed to fetch data:', response.statusText);
        return [];
    }
    const data = await response.json();
    return data;
}

//Create the graph
async function createGraph(){
    const data = await fetchData();

    console.log(data);

    const x_axis = data.map(item => new Date(item.date).toLocaleDateString());
    const favorable = data.map(item => item.favorable);
    const unfavorable = data.map(item => item.unfavorable);
    const eggs = data.map(item => item.eggs);
    const gas = data.map(item => item.gas);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_axis,
            datasets: [{
                label: 'Favorable Percent',
                data: favorable,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Unfavorable Percent',
                data: unfavorable,
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Egg Price',
                data: eggs,
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Gas Price',
                data: gas,
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    })
}

createGraph();