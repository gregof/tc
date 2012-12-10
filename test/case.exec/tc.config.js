{
    exec: function (inText, tc, callback) {
        this.out('\'' + inText + '\''); // 'this' used for testing, you can use tc.out
        callback();
    }
}