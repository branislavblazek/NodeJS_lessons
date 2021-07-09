const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 100);
    console.log(num);

    // set Header content-type
    res.setHeader('Content-type', 'text/html');

    var path = './views/';
    var code = null;
    switch (req.url) {
        case '/':
            path += 'index.html'
            code = 200;
            break;
        case '/about':
            path += 'about.html';
            code = 200;
            break;
        case '/about-x':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            code = 404;
            break;
    };

    // send HTML file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            res.statusCode = code;
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for request at 3000!');
});