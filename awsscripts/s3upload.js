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
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var file = process.argv[3];

var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;

var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
