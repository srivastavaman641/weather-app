var somePromise = new Promise( (resolve,reject) => {
  setTimeout( () => {
    // resolve('Hey!It Worked!');
    reject('Promise Rejected');
  },2000);
});

somePromise.then( (message) => {
  console.log('Success: ',message);
},(errorMessage) => {
  console.log('Error: ',errorMessage);
});
