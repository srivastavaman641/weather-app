const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      describe: 'Address to fetch',
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then( (response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Address does not exist');
  }

  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/b00e7be6bf219037677ad89356a38747/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);

}).then( (response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Current temperature is ${temperature} but it feels like ${apparentTemperature}.`);
}).catch( (e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers.')
  } else{
  console.log(e.message);
}
});
