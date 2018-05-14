import credentials from './config.js';
import React from 'react';

const AWS = require('aws-sdk');

AWS.config.credentials = credentials;
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB();

var UserData;

var params = {
  TableName: "RobertAparri",
  Limit: 10,
}


function getUserData(){
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
       if(err){
        console.log(err);
        reject(err);
      } // an error occurred
       else{
         resolve(data);
       }
      });
  })
}

function returnUserData(){
  getUserData().then(result => {
    return result;

  })
}
export default UserData;
