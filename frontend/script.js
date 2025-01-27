
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
    const bananas = data.map(item => item.bananas);
    const coffee = data.map(item => item.coffee);
    const chocolate = data.map(item => item.chocolate);

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
                backgroundColor: 'rgba(255, 165, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Gas Price',
                data: gas,
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Banana Price',
                data: bananas,
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Coffee Price',
                data: coffee,
                backgroundColor: 'rgba(128, 0, 128, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'Chocolate Price',
                data: chocolate,
                backgroundColor: 'rgba(150, 75, 0, 0.5)',
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