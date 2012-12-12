(function () {
    var testCase = {};
    return {
        beforeEach: function (tc) {
            if (testCase && testCase != tc) {
                testCase = tc;
                tc.OK = true;
            }
        },
        afterEach: function (tc) {
            if (testCase != tc) {
                testCase = null;
            }
        }
    };
})()