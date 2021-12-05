const request = require('postman-request')

const geoCode = (address,callback)=>{
    url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?&access_token=pk.eyJ1IjoiYWxpb2d1cm9sIiwiYSI6ImNrbjUybzU1ODAwNXkycXIxdXd4cXgwZzUifQ.EhqGulQ1hRvQ2xaBiA4T5g&limit=1'
    
    request({url,json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to Mapbox service')
        } else if(body.features.length == 0){
            callback('Could not find the location, try another search');
        }
        else {
            callback(undefined, data = { 
                latitude   : body.features[0].center[1],
                longitude  : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;