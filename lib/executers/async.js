exports.exec = function (inText, tc, callback) {
    var noFinish = true;
    tc.finish = function () {
        noFinish = false;
        callback();
        tc.finish = function () {
            throw new Error('Double finish!')
        };
    }
    
    eval(inText);

    process.on('exit', function () {
        if (noFinish) {
            throw new Error('TestCase didn\'t finish!')
        }
    });
};
