exports.exec = function (inText, tc, callback) {
    // eval in other function for hide callback
    evalCode(inText, tc);
    callback();
};

function evalCode (inText, tc) {
    eval(inText);
}