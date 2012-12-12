var testExec = require('./test-exec/exec.js');

exports.exec = function (inText, tc, callback) {
    function finish () {
        callback();
        tc.finish = function () {
            throw new Error('Double finish!');
        };
    }
    tc.finish = finish;

    testExec(inText, tc);

    process.on('exit', function () {
        if (tc.finish === finish) {
            callback(new Error('TestCase didn\'t finish!'));
        }
    });
};