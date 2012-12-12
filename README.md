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
tc.out(2 + 2);
tc.out(2 * 2);
//out
4
4
```
Function 'out' accumulates results. Each call create new line.

Run testCases from command line:
```
node tc/bin/tc caseDir
```
or from js:
```javascript
require('ts').run(caseDir);
```

### Config file - tc.config.js
Config file should be returned object with next fields:
  * exec(inText, tc, callback) - function executed testCase. 'inText' is text form case between '//in' and //out. 'tc' is testCase. 'tc.out' - method accumulates results. 'tc.fixPath' - fixed path from caseFile to process relative. 'callback' should be called for finish test.
  * [beforeEach] - function called before each testCase
  * [afterEach] - function called after each testCase

For example:
```javascript
{
    exec: function (inText, tc, callback) {
        tc.out('\'' + inText + '\'');
        callback();
    }
}
```
'exec' can be name of predefined executer. 
```javascript
{
    exec: 'async'
}
```
'exec' can be defined in another file. You should use 'conf.fixPath' for resolve relative path.
```javascript
{
    exec: require(conf.fixPath(./module.js)).exec
}
```
'exec' can send Error object to callback.
```javascript
{
    exec: function (inText, tc, callback) {
        // do something
        if (smfWrong) {
            callback(new Error('Something wrong!'))
        } else {
            callback();
        }
    }
}
```

### Example
See more examples in test directory.