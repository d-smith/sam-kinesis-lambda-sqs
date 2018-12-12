const _ = require('lodash');
const AWS = require('aws-sdk');
const SQS = new AWS.SQS();


console.log(`QueueUrl is ${process.env.DOWNSTREAM_Q_URL}`);

const handler = (event, context, callback) => {
    let records = event["Records"];
    console.log(`doIt invoked with ${records.length}`);

    let chunks = _.chunk(records, 10);
    console.log(`${chunks.length} chunks`);

    chunks.forEach((chunk) => {
        processChunk(chunk, callback);
    });
};

const processChunk = (chunk, callback) => {
    let id = 0;
    let entries = [];

    chunk.forEach((cr) => {
        let crData = Buffer.from(cr.kinesis.data, 'base64').toString()
        entries.push({
            Id: `${id++}`,
            MessageBody: crData
        });
    })

    let params = {
        QueueUrl: process.env.DOWNSTREAM_Q_URL,
        Entries: entries
    };

    console.log(`send message batch with ${JSON.stringify(params)}`);
    SQS.sendMessageBatch(params, (err, data) => {
        if(err) {
            console.log(err, err.stack);
            callback(err, null);
        } else {
            console.log(data);
        }
    });
    
};

module.exports = {
    handler
};