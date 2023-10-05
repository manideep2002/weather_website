const fs=require('fs');
const request=require('request');
const forecast= function(latitude,longitude,callback){
   const url="http://api.weatherstack.com/current?access_key=176021c691ad19dd626b2c914ce01780&query="+longitude+","+latitude;
   //console.log(url);
   request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect');
        }
        else if(body.error){
            callback('Coordinates does not exist')
        }
        else{
            callback(undefined,body)
        }
    })
}

module.exports=forecast;