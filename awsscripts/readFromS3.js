var AWS = require('aws-sdk');
// Set the region

AWS.config.update({
    accessKeyId: "AKIAJHM3JEBRNJCVSG5Q",
    secretAccessKey: "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",
    "region": "us-east-1"
});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var parameters = {Bucket: "heartsync-s3-bucket/Users/3lkqtfou9xllnul3qsy07ks2cbqiho1w/currentStatus.json", Key: '', Body: ''};
var file = "banddataexample.json";

var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
parameters.Body = fileStream;

var path = require('path');
parameters.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.getObject
