var abc = require('abc');
var path = require('path');

exports.load = function (caseFile, callback) {
    abc.file.read(caseFile, function (text) {
        var inIndex = text.indexOf('//in');
        var outIndex = text.indexOf('//out');

        var inText = text.substring(inIndex + 5, outIndex - 1);
        var outText = text.substring(outIndex + 6);

        callback({
            file: caseFile, 
            inText: inText, 
            outText: outText
        })
    })
}

exports.run = function (testCase, config, callback) {
    var outTextBuffer = []; 
    var testCaseContext = {
        out: function (text) {
            outTextBuffer.push(text);
        },
        fixPath: function (relPath) {
            return path.resolve(path.join(path.dirname(testCase.file), relPath));
        }
    };

    var testCaseFinished = false;
    config.beforeEach(testCaseContext, function () {
        config.exec(testCase.inText, testCaseContext, function (err) {
            
            if (err) {
                console.log('ERROR - ' + testCase.file);
                console.log(err.message);
            } else {
                checkAndPrintResult(outTextBuffer.join('\n'), testCase);
            }

            config.afterEach(testCaseContext, function () {
                testCaseFinished = true;
                callback();
            });
        });
    });

    process.on('exit', function () {
        if (!testCaseFinished) {
            console.log('ERROR - ' + testCase.file);
            console.log('TestCase didn\'t finish!');
        }
    });
}

function checkAndPrintResult (result, testCase) {
    if (result !== testCase.outText) {
        console.log('ERROR - ' + testCase.file)
        console.log('result:')
        console.log(result)
        console.log('expectedResult:')
        console.log(testCase.outText)
    } else {
        console.log('OK - ' + testCase.file)
    }
}

