fetch(`${endpoint}/api/v1/backend`)
    .then(res => res.json())    
    .then(data => {
        document.getElementById('test').innerText = JSON.stringify(data, null, 2);
    })