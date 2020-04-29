const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibnRpdnVndXJ1endhZW1tYW51ZWwiLCJhIjoiY2s5aWd2aTBiMDMyZjNldnlocTh4dDM3ZyJ9.3uXYG9HUiZ1d29XZYLJkgg&unit=1';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Internet', undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find Location Try onother Search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[1].center[0],
                longtude: body.features[1].center[1],
                location: body.features[1].place_name
            })
        }
    })
}

module.exports = geocode;