const yargs = require('yargs');
const request = require('request');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage,results) => {
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,(errorMessage,results) => {
      if(errorMessage){
        console.log(errorMessage);
      }
      else{
        console.log(`Current temperature is ${results.temperature} but it feels like ${results.apparentTemperature}.`);
      }
    });
  }
});
