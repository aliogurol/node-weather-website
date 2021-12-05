const request = require('postman-request');

const forecast = (latitude,longitude,callback)=>{
    url ='http://api.weatherstack.com/current?access_key=b976b67848b5112cc23708788ee36153&query='+latitude+','+longitude+'';
    
    request({url, json:true}, (error,{body})=>{
        if (error) {
            callback('Unable to connect to the Weather service');
        }else if(body.error){
            callback(body.error)
        }else{
            callback(undefined,body.current);
        }
    });
};

module.exports = forecast;