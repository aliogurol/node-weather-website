const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ali Ogurol'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
       return res.send({
            error: 'You must provide an address to search!',
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if(error){
            return res.send(error)
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
              return res.send(error)
            }
        
            res.send({
                forecast: forecastData,
                location,
            })
        })
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Ali Ogurol'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Ali Ogurol',
        helpText: 'some useful text'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ali Ogurol',
        errorMsg: 'Article not found'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ali Ogurol',
        errorMsg: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})