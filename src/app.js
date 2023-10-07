require('dotenv').config();
const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');
const app=express();
const publicDirectoryPath = path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partials');
const port=process.env.PORT || 3000;
app.set('views', path.join(__dirname, '../templates/views'));
const options = {
    extensions: ['html']
}
app.use(express.static(publicDirectoryPath));
app.set('view engine','hbs');
hbs.registerPartials(partialPath);
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Manideep'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{title: 'About page',
                name: 'Manideep'})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Manideep'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address || '';
    if(!address){
        return res.send({Error: "You must provide an address."});
    }
    geocode(address,(error,response)=>{
        if(error){
           return res.send({error: error});
        }
        else if(undefined,response){
            
            lat=response.latitude;
            lon=response.longitude;
            //console.log(responsse.body.data[0]);
            forecast(lon,lat,(error1,response1)=>{
                if(error1)
                res.send({error:error1});
                else{
                    res.send([response1.location,response1.current]);
                }
            })
        }
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{Name:'Manideep',
                        title: '404',
                    errorMessage: 'Help article does not exist'})
})
app.get('*',(req,res)=>{
    res.render('404',{Name:'Manideep',
                        title: '404',
                    errorMessage: 'Error404: Page does not exist'})
})
app.listen(port,()=>{
    console.log("Server is fired up at port "+ port);
})