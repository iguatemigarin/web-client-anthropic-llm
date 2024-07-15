// This script will be used to create a proxy server within a WebContainer.
// It will listen for incoming requests from the client-side application,
// forward them to the Anthropic API, and return the response back to the client.
const http = require('http');
const https = require('https');

const API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

const proxyServer = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/proxy') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // The API key and other sensitive information should be securely retrieved and not hardcoded
          'X-API-Key': process.env.ANTHROPIC_API_KEY, // Assuming the API key is set as an environment variable
        },
      };

      const apiReq = https.request(API_ENDPOINT, requestOptions, apiRes => {
        let apiResponse = '';
        apiRes.on('data', chunk => {
          apiResponse += chunk;
        });
        apiRes.on('end', () => {
          res.writeHead(apiRes.statusCode, apiRes.headers);
          res.end(apiResponse);
        });
      });

      apiReq.on('error', error => {
        console.error('Error contacting API:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
      });

      apiReq.write(body);
      apiReq.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
proxyServer.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});