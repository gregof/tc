var testExec = require('./test-exec/exec.js');

exports.exec = function (inText, tc, callback) {
    testExec(inText, tc);
    callback();
};

