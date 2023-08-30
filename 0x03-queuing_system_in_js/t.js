import { createClient } from 'redis';
import { promisify } from 'util';
const redis = require('redis');

const client = createClient({
 host: 'localhost',
 port: 6379
});
const Async = promisify(client.get).bind(client);

client.on('connect', () => {
 console.log('Redis client connected to the server');
});

client.on('error', err => console.log('Redis client not connected to the server: ', err));

function setNewSchool(schoolName, value){
	client.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName){
	client.get(schoolName, (error, result) => console.log(result));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');