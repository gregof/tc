{
    defaultCommand: function (command, in, out, callback) {
        require('child_process').exec(command, function (err, stdout, stderr) {
            if (err) {
                console.log('ERROR:', err);
            } else {
                callback();
            }
        });
    },
    commands: {
        test: function (out, callback) {
            out(42);
        }
    },
    beforeEach: function () {

    },
    afterEach: function () {

    }
}