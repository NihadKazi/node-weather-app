const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibmloYWQxNzkyIiwiYSI6ImNrOGRiMnNneDA4emozbXBnMjRnM3FwaXcifQ.pVs5rY-XwZNKkR6eK3w1fw'

    request({ url: url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to location services", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const placeName = body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: placeName
            })
        }

    })
}

module.exports = geocode