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

// Publisher client
const p_channel = 'holberton school channel';


function publishMessage(message, time) {
    setTimeout(() => {
        console.log(`About to send ${message}`);
        client.publish(p_channel, message, function (err, reply) {
            // console.log(reply); // 2
        });

    }, time);

}
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);