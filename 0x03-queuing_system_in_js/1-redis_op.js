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
    client.shutdown();
});

async function setNewSchool(schoolName, value) {
    // Strings

    client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    client.get(schoolName, function (err, reply) {
        console.log(reply); // value
    });
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
client.flushall