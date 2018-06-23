console.log('Starting App')

setTimeout(() => {
  console.log('Inside the Callback');
},2000);

setTimeout(() => {
  console.log('Without Timeout');
},0);

console.log('Finishing App');
