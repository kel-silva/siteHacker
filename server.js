const express = require('express');
const fs = require('fs');
const requestIp = require('request-ip');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestIp.mw()); // Middleware para capturar o IP do cliente
app.use(express.static('public')); // Para servir arquivos estáticos

app.post('/log', (req, res) => {
    const ip = req.clientIp;
    const ipType = ip.includes(':') ? 'IPv6' : 'IPv4'; // Detectar IPv4 ou IPv6

    // Captura a hora atual em formato local
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const logData = `Data/Hora: ${timestamp}, Latitude: ${req.body.latitude}, Longitude: ${req.body.longitude}, User Agent: ${req.body.userAgent}, Situação Econômica: ${req.body.economicSituation}, IP: ${ip} (${ipType})\n`;

    fs.appendFile('log.txt', logData, err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao gravar log.');
        }
        res.send('Dados registrados com sucesso!');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
