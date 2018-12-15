const utils = require('./utils.js');

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

    const hash = utils.generate_hash_url(data.originalUrl);

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Success',
            data: {}
        })
    };

    callback(null, response);
};
