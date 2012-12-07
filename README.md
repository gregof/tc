## tc
Test case runner.

### Test cases files
Create directory with testCases. Each file with testCase must contains '.case.' in name. 
```
caseDir/
  tc.config.js //optional
  A.case.js
  B.case.js
```

### TestCase file structure
```
//in
test case text (js code by default)
//out
expected result
```

For example:
```javascript
//in
out(2 + 2);
out(2 * 2);
//out
4
4
```
Function 'out' accumulates results. Each call create new line.

Run testCases from command line:
```
tc caseDir
```
or from js:
```javascript
require('ts').run(caseDir);
```

### Config file - tc.config.js
Config file should be returned object with next fields:
  * exec(inText, out, collback) - function executed testCase. 'inText' is text form case between '//in' and //out. 'out' is function accumulates results. 'collback' should be called for finish test.
  * [beforeEach] - function called before each testCase
  * [afterEach] - function called after each testCase

For example:
```javascript
{
    exec: function (inText, out, callback) {
        out('\'' + inText + '\'');
        callback();
    }
}
```

### Example
See examples in test directory.