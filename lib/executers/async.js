exports.exec = function (inText, out, callback) {
    function finish() {
        callback();
        finish = function () {};
    }
    
    eval(inText);
    
    process.on('exit', function () {
        finish()
    });
};
