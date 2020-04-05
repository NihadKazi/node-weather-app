const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/a389a0732225c4848581f823b35271a6/'+ encodeURI(latitude) +','+encodeURI(longitude)

    request({ url: url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to location services", undefined)
        } else if (body.error) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const temperatureJSON = body.currently.temperature
            const precipJSON = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary +' Today\'s temparature is: ' + temperatureJSON + ' & there\'s a ' + precipJSON + '% chance of rain.')
        }
        }

    )

}

module.exports = forecast