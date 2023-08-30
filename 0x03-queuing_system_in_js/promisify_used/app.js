const app = require('express')();
const bodyParser = require('body-parser');

// parse to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// store integration
const { get, set } = require('./store');

// parse to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get from redis
app.get('/:key', async (req, res) => {
    const message = await get(req.params.key).catch((err) => {
        if (err) console.error(err)
    });

    // send response
    res.send({
        status: 200,
        message: message
    })
});

// write to redis
app.post('/send', async (req, res) => {
    await set(req.body.key, req.body.value);

    // send response
    res.send({
        status: 200,
        message: 'Ok'
    })
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});