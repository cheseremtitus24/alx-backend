const jobs = [
    {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
    },
    {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153118782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4158718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153818782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4154318781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4151218782',
        message: 'This is the code 4321 to verify your account'
    }
];
var kue = require('kue')
    , push_notification_code = kue.createQueue();
for (let data of jobs) {
    let job = push_notification_code.create('email', data).priority('high').attempts(5).backoff({ delay: 60 * 1000, type: 'fixed' }).ttl(60 * 1000 * 7).removeOnComplete(true).save(function (err) {
        if (!err) console.log(`Notification job created: ${job.id}`);
    });
    job.on('complete', function (result) {
        console.log(`Notification job ${job.id} completed`, result);

    }).on('failed attempt', function (errorMessage, doneAttempts) {
        console.log(`Notification job ${job.id} failed: ${errorMessage} with doneAttempts ${doneAttempts}`);

    }).on('failed', function (errorMessage) {
        console.log(`Notification job ${job.id} failed: `, errorMessage);

    }).on('progress', function (progress, data) {
        // console.log('Notification job JOB_ID PERCENTAGE% complete');
        console.log('Notification job ' + job.id + ' ' + progress + '% complete', data);

    });

}
