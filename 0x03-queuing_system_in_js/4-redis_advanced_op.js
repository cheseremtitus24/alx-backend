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
// Hashes

client.hset('HolbertonSchools', 'Portland', 50,redis.print);
client.hset('HolbertonSchools', 'Seattle',80,redis.print);
client.hset('HolbertonSchools', 'New York',20,redis.print);
client.hset('HolbertonSchools', 'Bogota',20,redis.print);
client.hset('HolbertonSchools', 'Cali',40,redis.print);
client.hset('HolbertonSchools', 'Paris',2,redis.print);

client.hgetall('HolbertonSchools', function(err, object) {
  console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});
