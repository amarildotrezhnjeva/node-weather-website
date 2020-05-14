
const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


//define paths for cexpress config
const publicDirectorypath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//Setup hndb engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)

//Setup static directory to serve
app.use(express.static(publicDirectorypath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weahter app',
        name:'rildi'
    })
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:"hello",
        name:"rildi"
    })

})
app.get('/help',(req,res)=>{

    res.render('help',{message:'This is the help page contact us',
    title:'help',
    name:'Rildi'
})})

app.get('/weather',(req,res)=>{

    if(!req.query.adress){
        return res.send({
            error:'must provide an adress'
        })
    }
    geocode(req.query.adress,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error ,forecastData)=>{
            if(error){
                return res.send({error})

            }
            res.send({
                forecast:forecastData,
                location,
                adress:req.query.adress
            })
        })
    })
   
/*
    res.send({
        forecast:'25 degree',
        location:'Tirana',
        adress: req.query.adress
    })
*/})


app.get('/products',(req,res)=>{

    if(!req.query.search){

      return res.send({
            error:'you must prvide a search'
        }) 
    }

   console.log(req.query.search)
    res.send({
        products:[]
    })


})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Rildi",
        errorMessage:'Couldn find help article'
    })

})
app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:"rildi",
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

