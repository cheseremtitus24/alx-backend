const interval = 1000;
let kue = require('kue')
  , queue = kue.createQueue();


queue.process('email', 2, function (job, done) {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
// fix unstable Redis Connections
queue.watchStuckJobs(interval);
// Graceful Shutdown of process workers
process.once('SIGTERM', function (sig) {
  queue.shutdown(5000, function (err) {
    console.log('Kue shutdown: ', err || '');
    process.exit(0);
  });
});

queue.on('error', function (err) {
  console.log('Oops... ', err);
});

function sendNotification(phoneNumber, message, job, done) {
  const blacklisted_PhoneNumbers = ['4153518780', '4153518781'];

  job.progress(0, 100);
  if (blacklisted_PhoneNumbers.includes(phoneNumber)) {

    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    // return;
  }

  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done(null,job.id);
  // done(null, job);
  //   if(phoneNumber === null) {
  //     //done('invalid to address') is possible but discouraged
  //     return done(new Error('invalid to address'));
  //   }
  //   if (message === null)
  //   {
  //     return done(new Error("message can't be empty"))
  //   }
  // console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // // email send stuff...
  // done(null,"dummy data");
}