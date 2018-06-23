const request = require('request');

var geocodeAddress = (address) => {
  return new Promise( (resolve,reject) => {

    request({
      url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json : true
    },
     (error,response,body) => {
      if(error){
      reject('Unable to connect to google servers.');
      }
      else if(body.status==='ZERO_RESULTS'){
        reject('Address does not exist.');
      }
      else if(body.status==='OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
    }
    });
  });
};

geocodeAddress('Okni Hazaribagh').then( (result) => {
  console.log(JSON.stringify(result,undefined,2));
}).catch( (errorMessage) => {
  console.log(errorMessage);
});
