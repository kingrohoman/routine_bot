const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.json': 'application/json',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Strip query strings or hashes
    const urlPath = req.url.split('?')[0].split('#')[0];
    let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
