const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express();
const port = process.env.PORT || 3000
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {
    res.send({
        name: 'Yaniv',
        Age: '39'

    });
})
app.get('/help', (req, res) => {
    res.send('Help Page');
})


app.get('', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);

});