const request = require('request')
const forecast=(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/9e534a59c7e89cd7d72e0e70b6e11b38/'+ lat + ',' + long
    request({url:url , json:true},(error,{body})=>{
        if(error){
            callback('Unable to find server',undefined)
        }
        else if(body.error){
            callback('Cannot find location',undefined)
        }
        else{
            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary+"It is currently "+body.currently.temperature + "  degrees out."+ "temperature highest today is " + body.daily.data[0].temperatureHigh  + "There is a  "+ body.currently.precipProbability + " chance of rain." 
            )
        }
    })
}



module.exports = forecast