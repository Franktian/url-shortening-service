const dynamoDb = require('./dynamodb');

module.exports.getUrl = (event, context, callback) => {
    console.log('Getting url');
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            hash: event.pathParameters.hash,
        },
    };

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t get the url',
            });
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item.originalUrl)
        };

        callback(null, response);
    });
};
