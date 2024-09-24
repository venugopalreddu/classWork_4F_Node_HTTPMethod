const http = require('http');
const querystring = require('querystring'); 

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>GET Method is Processed</h1>');
        res.end();
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); 
        });
        req.on('end', () => {
            const parsedData = querystring.parse(body); 

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>POST Method is Processed</h1>');
            res.write('<h2>Received Data:</h2>');
            res.write(<p>Name: ${parsedData.name}</p>);
            res.write(<p>Email: ${parsedData.email}</p>);
            res.write(<p>Password: ${parsedData.password}</p>);
            res.write(<p>Confirm Password: ${parsedData['confirm-password']}</p>);
            res.end();
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.write('<center>Data Error</center>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is running @ http://localhost:3000");
});