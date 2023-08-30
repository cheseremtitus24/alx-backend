import { createClient } from 'redis';
const redis = require("redis");
const { promisify } = require("util");

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

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const setValue = async (key, value) => {
    return new Promise(resolve => {
        resolve(client.set(key, value, redis.print));
    })
};

async function setNewSchool(schoolName, value) {
    // Strings

    await setValue(schoolName, value);
    // console.log(result);

}

async function displaySchoolValue(schoolName) {
    let value = await get(schoolName).catch((err) => {
        if (err) console.error(err)
    }); // value
    console.log(value);

}

    displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
   
    displaySchoolValue('HolbertonSanFrancisco');
    client.flushall


