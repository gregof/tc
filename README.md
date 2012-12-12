## tc
Test case runner.

### Test cases files
Create directory with testCases. Each file with testCase must contains '.case.' in name. 
```
caseDir/
  tc.conf.js //optional
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
Method 'tc.out' accumulates results. Each call create new line.

You can run testCases from command line:
```
node tc/bin/tc caseDir
```
or from js:
```javascript
require('ts').run(caseDir);
```

### Config file - tc.conf.js
Config file should return object with next fields:
  * exec(inText, tc, callback) - function for testCase execution. 
    * 'inText' - text form testCase between '//in' and //out. 
    * 'tc' - testCase object. 
      * 'tc.out' - this method accumulates results. 
      * 'tc.fixPath' - can be used for relative path resolving.
    * 'callback' should be called for test finishing.
  * [beforeEach] - function will be called before each testCase.
  * [afterEach] - function will be called after each testCase.

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
You can use code from another files. You should use 'conf.fixPath' for resolve relative path.
```javascript
{
    exec: require(conf.fixPath(./module.js)).exec
}
```

### Example
See more examples in test directory.
