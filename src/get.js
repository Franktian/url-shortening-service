module.exports.getUrl = (event, context, callback) => {
    console.log('Getting url hahahha');

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Success',
            data: {}
        })
    };

    callback(null, response);
};
