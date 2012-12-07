(function () {
    var testCase = {};
    return {
        beforeEach: function () {
            if (testCase && testCase != this) {
                testCase = this;
                this.OK = true;
            }
        },
        afterEach: function () {
            if (testCase != this) {
                testCase = null;
            }
        }
    };
})()