var abc = require('abc');

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
    var out = function (text) {
        outTextBuffer.push(text);
    };

    var caseContext = {};

    try {
        if (config.beforeEach) {
            config.beforeEach.call(caseContext);
        }
    } catch (e) {
        console.log(testCase.file + ' - beforeEach ERROR');
        console.log(e.stack);
        callback();
        return;
    }

    try {
        config.exec.call(caseContext, testCase.inText, out, function () {
            
            try {
                if (config.afterEach) {
                    config.afterEach.call(caseContext);
                }
            } catch (e) {
                console.log(testCase.file + ' - afterEach ERROR');
                console.log(e.stack);
                callback();
                return;
            }

            checkAndPrintResult(outTextBuffer.join('\n'), testCase);
            callback();

        });
    } catch (e) {
        console.log(testCase.file + ' - ERROR');
        console.log(e.stack);
        callback();
        return;
        }
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

