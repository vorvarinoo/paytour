const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('express-http-proxy');
require('dotenv').config(); // Загружаем переменные окружения из .env файла

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// Прокси для всех запросов к внешнему API
app.use('/api', proxy('https://api.worldota.net', {
  proxyReqPathResolver: function(req) {
    return `/api/b2b/v3${req.url}`;
  },
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    // Добавление заголовков авторизации
    const apiKeyId = process.env.API_KEY_ID;
    const apiKeyToken = process.env.API_KEY_TOKEN;
    const authHeader = 'Basic ' + Buffer.from(`${apiKeyId}:${apiKeyToken}`).toString('base64');
    
    proxyReqOpts.headers['Authorization'] = authHeader;
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    return proxyReqOpts;
  }
}));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});