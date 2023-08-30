const interval = 1000;
var kue = require('kue')
    , queue = kue.createQueue();

queue.process('email', function (job, done) {
    sendNotification(job.data.phoneNumber, job.data.message, done);
});
// fix unstable Redis Connections
queue.watchStuckJobs(interval)
// Graceful Shutdown of process workers
process.once( 'SIGTERM', function ( sig ) {
    queue.shutdown( 5000, function(err) {
      console.log( 'Kue shutdown: ', err||'' );
      process.exit( 0 );
    });
  });

queue.on('error', function (err) {
    console.log('Oops... ', err);
});

function sendNotification(phoneNumber, message, done) {
      if(phoneNumber === null) {
        //done('invalid to address') is possible but discouraged
        return done(new Error('invalid to address'));
      }
      if (message === null)
      {
        return done(new Error("message can't be empty"))
      }
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    // email send stuff...
    done(null,"dummy data");
}