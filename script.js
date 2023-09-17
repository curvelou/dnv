document.getElementById('sample-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let data = {
        ponto: document.getElementById('ponto').value,
        tratamento: document.getElementById('tratamento').value,
        massa: document.getElementById('massa').value,
        fragmentos: document.getElementById('fragmentos').value,
        fibras: document.getElementById('fibras').value
    };

    fetch('/add_sample', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// ... (restante do código JavaScript) ...

document.getElementById('get-samples-btn').addEventListener('click', function() {
    fetch('/get_samples')
    .then(response => response.json())
    .then(data => {
        let resultDiv = document.getElementById('samples-result');
        resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('export-samples-btn').addEventListener('click', function() {
    window.location.href = '/export_samples';
});
document.getElementById('plot-samples-btn').addEventListener('click', function() {
    fetch('/plot_samples')
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
