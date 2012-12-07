exports.exec = function (inText, out, callback) {
    eval(inText);
    callback();
};