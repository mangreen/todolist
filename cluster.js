// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    console.log(cpuCount);

    if (cpuCount > 4) {
        cpuCount = 4;
    }

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function(worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

    // Code to run if we're in a worker process
} else {
    var app = require("./server");
    var debug = require('debug')('tmp');

    var server = app.listen(app.get('port'), function() {
        console.log('==> 🌎  Express server listening on port ' + server.address().port);
        debug('==> 🌎  Express server listening on port ' + server.address().port);
    });
}