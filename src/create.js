const utils = require('./utils.js');
const dynamoDb = require('./dynamodb');

module.exports.createUrl = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.originalUrl !== 'string') {
        console.error('Payload has no original url');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not generate url!'
        });
    }

    console.log('Base url', process.env.BASE_URL);

    const hash = utils.generate_hash_url();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            hash: hash,
            originalUrl: data.originalUrl,
            createdAt: timestamp,
        }
    };

    dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(`${process.env.BASE_URL}${hash}`),
        };
        callback(null, response);
    });
};
