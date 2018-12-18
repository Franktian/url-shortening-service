const constants = require('./constants');

module.exports.generate_hash_url = () => {
    let random = Math.floor(Math.random() * constants.MAX_URL_RANGE);
    const map = "abcedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let hash = '';
    while (random) {
        hash += map[random % 62];
        random = Math.floor(random / 62);
    }

    return hash;
};
