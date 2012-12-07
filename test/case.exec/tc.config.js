{
    exec: function (inText, out, callback) {
        out('\'' + inText + '\'');
        callback();
    }
}