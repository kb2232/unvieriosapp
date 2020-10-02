// const AWS = require('aws-sdk');
// const bcrypt = require('bcrypt');
// const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
// event=
// {
//   "email": "kbabatunde@aol.com",
//   "password": "testing"
// }
// const FunA = (event,context, callback) => {
//   console.log("......process starts......")
//   // TODO implement
//   let response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   const { email, password} = event;
//   let newPassword;
  
//   let params = {
//     TableName:'usersAuthentication',
//     Key:{
//       email: email
//     }
//   };
//   /* check if your email or username is already registered */
//   docClient.get(params, function(err, data) {
//       if(err){
//           response.body = JSON.stringify('cannot find');
//           callback(err, null);
//       } else {
//           response.body = JSON.stringify(data);
//           callback(null, data);
//       }
//   });
//   return response;
// };
// console.log(FunA(event))



hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

console.log(hashCode("babatunde"));