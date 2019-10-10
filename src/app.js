const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlernars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//set up directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Max'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Max'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title:'Help ME!',
        name:'Max'
    })
})
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },
//     {
//         nane:'Sera',
//         age:15
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "please provide an address"})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        } 
        forecast(latitude, longitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forcastdata,
                location,
                address: req.query.address
            })
    })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helparticle',{
        message: 'Help article not found',
        name:'Max'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message: '404 not found',
        name:'Max'
    })
})

app.listen(port,()=>{
    console.log('This is on 3000 port')
})