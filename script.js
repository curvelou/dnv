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
    window.location.href = '/plot_samples';
});
