var redis = require('redis');
var Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype); 
Promise.promisifyAll(redis.Multi.prototype); 


var client = redis.createClient();


function set(key, value) {
    return client.setAsync(key, value);
}


function get(key) {
    return client.getAsync(key);
}


function expire(key, timeInSeconds) {
    client.expire(key, timeInSeconds);
}

function quit() {
    client.quit();
}

module.exports = {
    get: get,
    set: set,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
}