async function fetchData(url, options = {}) {
    try {
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        // Adicione aqui um feedback de erro na UI, se desejar
    }
}

function getElementById(id) {
    return document.getElementById(id);
}

function setupEventListeners() {
    getElementById('sample-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        let data = {
            ponto: getElementById('ponto').value,
            tratamento: getElementById('tratamento').value,
            massa: getElementById('massa').value,
            fragmentos: getElementById('fragmentos').value,
            fibras: getElementById('fibras').value
        };

        let result = await fetchData('/add_sample', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        getElementById('result').innerText = result.message;
    });

    getElementById('get-samples-btn').addEventListener('click', async function() {
        let data = await fetchData('/get_samples');
        let resultDiv = getElementById('samples-result');
        resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    });

    getElementById('export-samples-btn').addEventListener('click', function() {
        window.location.href = '/export_samples';
    });

    getElementById('plot-samples-btn').addEventListener('click', async function() {
        let data = await fetchData('/plot_samples');
         var ids = data.map(d => d.id);
    var massas = data.map(d => d.massa);
    var fragmentos = data.map(d => d.fragmentos);
    var fibras = data.map(d => d.fibras);

    var trace1 = {
        x: ids,
        y: massas,
        mode: 'markers',
        type: 'scatter',
        name: 'Massa',
        marker: { color: 'blue' }
    };

    var trace2 = {
        x: ids,
        y: fragmentos,
        mode: 'markers',
        type: 'scatter',
        name: 'Fragmentos',
        marker: { color: 'green' }
    };

    var trace3 = {
        x: ids,
        y: fibras,
        mode: 'markers',
        type: 'scatter',
        name: 'Fibras',
        marker: { color: 'red' }
    };

    var layout = {
        title: 'Análise de Amostras',
        xaxis: {
            title: 'ID'
        },
        yaxis: {
            title: 'Valor'
        }
    };

    var config = {
        responsive: true
    };

    Plotly.newPlot('samples-result', [trace1, trace2, trace3], layout, config);
});

document.addEventListener('DOMContentLoaded', setupEventListeners);
