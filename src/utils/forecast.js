const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=65c3fa0301223872ff3ab81857b2df91&query=' + latitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather stack', undefined);
        } else if (body.error) {
            callback('Unable to find Location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} throught the Day. It is current ${body.current.temperature} Degrees out. This is a high today ${body.current.temperature}  There is a ${body.current.feelslike}% chance of rain.`);

        }
    })
}


module.exports = forecast;