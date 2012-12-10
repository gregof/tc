exports.exec = function (inText, tc, callback) {
    tc.finish = function () {
        callback();
        tc.finish = function () {};
    }
    
    eval(inText);

    process.on('exit', function () {
        tc.finish()
    });
};
