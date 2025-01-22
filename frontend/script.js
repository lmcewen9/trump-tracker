async function fetchData(){
    const url = process.env.URL
    const response = await fetch(url);
    if (!response.ok){
        console.error("Failed to fetch data:", response.statusText);
        return [];
    }
    const data = await response.json();
    return data;
}

async function createGraph(){
    const data = await fetchData();

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

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