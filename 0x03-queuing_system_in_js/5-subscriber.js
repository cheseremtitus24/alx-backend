import { createClient } from 'redis';
const redis = require("redis");
const client = createClient({
    host: 'localhost',
    port: 6379
});

client.on('connect', function () {
    console.log('Redis client connected to the server');
});

client.on('error', function (err) {
    console.log('Redis client not connected to the server: ', err);
    client.quit();
});

// Subscribe client
const s_channel = 'holberton school channel';

client.subscribe(s_channel, function (err, reply) {
    // console.log(reply); // 2
});

client.on('message', (channel, message) => {
    if (channel === s_channel) {
        console.log(message);
    }
    if (message === 'KILL_SERVER') {
        client.unsubscribe(s_channel);
        client.quit();
    }
});