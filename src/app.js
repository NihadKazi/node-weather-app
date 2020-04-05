const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

//Define  paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPAth = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPAth) 
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nihad Kazi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nihad Kazi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help Page',
        name: 'Nihad Kazi'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
            if(error) {
                return res.send({
                    error: error    
                })
            } 
        
            forecast(longitude, latitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error: error    
                    })
                }

                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
                
            })
        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('ErrorPage', {
        title: "Error 404",
        name: "Nihad Kazi",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {    
    console.log('Listening ' + port)
})