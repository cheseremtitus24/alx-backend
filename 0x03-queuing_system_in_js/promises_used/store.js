const client = require('redis').createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on("error", (error) => {
    console.error(error);
});

const setValue = async (key, value) => {
    return new Promise(resolve => {
        client.set(key, value, (err, res) => {
            if (err) console.error(err);
            resolve(res);
        })
    })
};

const getValue = async (key) => {
    return new Promise(resolve => {
            client.get(key, (err, res) => {
                if (err) console.error(err);
                resolve(res);
            })
        }
    )
};

const setList = async (key, value) => {
    return new Promise(resolve => {
        client.rpush(['frameworks', 'js', 'angular'], (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const getList = async (key) => {
    return new Promise(resolve => {
        client.lrange(key, 0, -1, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const addSet = async (key, value) => {
    return new Promise(resolve => {
        client.sadd([key, value], (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const getSet = async (key) => {
    return new Promise(resolve => {
        client.smembers(key, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const remSet = async (key, value) => {
    return new Promise(resolve => {
        client.srem(key, value, (err, res) => {
            if (err) console.error(err)
            resolve(res)
        })
    })
}


async function testList() {
    let res = await getSet('browsers')
    console.log('browsers: ', res)
}

testList().then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})


module.exports = {
    setValue,
    getValue,
    setList,
    getList,
    addSet,
    remSet,
    getSet
};