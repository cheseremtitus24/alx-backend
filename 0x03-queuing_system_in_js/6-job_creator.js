var kue = require('kue')
  , push_notification_code = kue.createQueue();
  var job = push_notification_code.create('email', {
    phoneNumber: "4153518780",
    message: "This is the code to verify your account",
  }).priority('high').attempts(5).backoff( {delay: 60*1000, type:'fixed'} ).ttl(60*1000*7).removeOnComplete( true ).save( function(err){
   if( !err ) console.log(`Notification job created: ${job.id}` );
});
job.on('complete', function(result){
    console.log('Notification job completed', result);
  
  }).on('failed attempt', function(errorMessage, doneAttempts){
    console.log('Job failed');
  
  }).on('failed', function(errorMessage){
    console.log('Notification job failed');
  
  }).on('progress', function(progress, data){
    console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
  
  });