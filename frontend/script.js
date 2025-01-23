
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

    const labels = data.map(item => new Date(item.date).toLocaleDateString());
    const values = data.map(item => item.eggs);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Trump Dataset',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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