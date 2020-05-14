
const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherapi.com/v1/forecast.json?key=f6959d513ae84fbaa8e121545200804&q='+latitude+','+longitude+'&days=1&lang=es'
request({url,json:true},(error, { body })=>
{
    if(error)
{
    callback('Unable to connect to weather service ',undefined)
}    else if(body.error){
    callback('unable to find location',undefined)
}
else{
    callback(undefined,body.forecast.forecastday[0].day.condition.text   +'It is currently'+ body.current.temp_c + '.There is '+body.current.precip_in +'% chance of rain')
}
})}
module.exports=forecast
