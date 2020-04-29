const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//Define Path for Expree Configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//set Up handbars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//set Static directory to Serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Emmanuel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Emmanuel'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful Text',
        title: 'Help',
        name: 'Emmanuel NTIVUGURUZWA'
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emmanuel NTIVUGURUZWA',
        errorMessage: 'Help Article Not Found!'
    })
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You Must Provide an Address'
        })
    }

    geocode(req.query.address, (error, { latitude, longtude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longtude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide a Search Term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emmanuel NTIVUGURUZWA',
        errorMessage: 'Page Not Found'
    })
});


//Starting Server
app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});