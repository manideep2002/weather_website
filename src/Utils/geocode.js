const request = require('request')

const geocode = (address, callback) => {
    if(!address)
    console.log("Kindly provide the address")
    url=geourl="http://api.positionstack.com/v1/forward?access_key=bab044faf37662ae5ce6aaddc26f7a85&query="+address;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.error) {
            return callback('Unable to find location. Try another search.', undefined)
        } else if (body.data.length===0) {
            callback('Unable to find location. Try another search.', undefined)
        }
         else {
            callback(undefined, {
                 latitude: body.data[0].latitude,
                 longitude: body.data[0].longitude,
                 body: body
            })
        }
    })
}

module.exports = geocode