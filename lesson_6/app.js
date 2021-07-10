const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// registre view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Isiel som do Tatier', snippet: 'Videl som tam vela turistov' },
        { title: 'Na biku do Bytce', snippet: 'Vodici su dost nepozorny' },
        { title: 'Nedavajte psovi jest neskoro vecer', snippet: 'Ostane vam viac jedla' },
    ];

    res.render('index', { title: 'Home', blogs })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});