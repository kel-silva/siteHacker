// Função para coletar os dados
function coletarDados() {
    // Obtém o IP usando uma API externa (ex: ipify)
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            // Obtém outras informações do navegador
            const navegador = navigator.userAgent;
            const sistemaOperacional = navigator.platform;

            // Solicita a geolocalização
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Envia os dados para um servidor (substitua a URL pelo seu endpoint)
                    fetch('/coletar-dados', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ip, navegador, sistemaOperacional, latitude, longitude })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));
                }
            );
        });
}

// Chama a função ao carregar a página
coletarDados();