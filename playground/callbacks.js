var getUser = (id,callback) => {
  var user = {
    id : id,
    name: 'Aman'
  };
  setTimeout(() => {
  callback(user);
  },3000);
};

getUser(97,(UserInfo) => {
  console.log(UserInfo);
});
