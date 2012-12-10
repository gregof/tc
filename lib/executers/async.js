exports.exec = function (inText, tc, callback) {
    function finish () {
        callback();
        tc.finish = function () {
            throw new Error('Double finish!');
        };
    }
    tc.finish = finish;

    // eval in other function for hide callback
    evalCode(inText, tc);

    process.on('exit', function () {
        if (tc.finish === finish) {
            callback(new Error('TestCase didn\'t finish!'));
        } else {
            callback();
        }
    });
};

function evalCode (inText, tc) {
    eval(inText);
}