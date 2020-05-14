const request=require('request')
const geocode=(adress,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYW1hcmlsZG8xIiwiYSI6ImNrOHZ1NmFldDBjZ2szaG56MWd2MjRtNzgifQ.RvU0KeRZNFBlyGoZsZUJ0w&limit=1'

    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to coonect to locationservices',undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to find location, try another',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode