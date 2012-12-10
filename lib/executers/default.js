exports.exec = function (inText, tc, callback) {
    eval(inText);
    callback();
};