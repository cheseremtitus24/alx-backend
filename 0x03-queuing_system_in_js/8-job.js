
function createPushNotificationsJobs(jobs, queue) {
    /**
     * jobs: array of Objects
     * queue: Kue queue
     */

    // Verify that jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error("Jobs is not an array");
    }
    //    = kue.createQueue();
    // Loop through the jobs array
    for (let data of jobs) {
        let job = queue.create('email', data).priority('high').attempts(5).backoff({ delay: 60 * 1000, type: 'fixed' }).ttl(60 * 1000 * 7).removeOnComplete(true).save(function (err) {
            if (!err) console.log(`Notification job created: ${job.id}`);
        });
        job.on('complete', function (result) {
            console.log(`Notification job ${result} completed`);

        }).on('failed attempt', function (errorMessage, doneAttempts) {
            console.log(`Notification job ${job.id} failed: ${errorMessage}`);

        }).on('failed', function (errorMessage) {
            console.log(`Notification job ${job.id} failed: `, errorMessage);

        }).on('progress', function (progress, data) {
            // console.log('Notification job JOB_ID PERCENTAGE% complete');
            console.log('Notification job ' + job.id + ' ' + progress + '% complete');

        });

    }
}
export default createPushNotificationsJobs;