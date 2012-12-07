(function () {

    function exec (inText, out, callback) {
        var commands;
        eval('commands=' + inText);

        require('abc').async.sequence(
            commands,
            function (command, callback) {
                execCommand(command, out, callback);
            },
            callback
        );

    }

    function execCommand (command, out, callback) {
        switch (command) {
            case 'test':
                out(42);
                callback();
                break;
            case 'towel':
                out('yes');
                callback();
                break;            
            default:
                out('unknown command');
                callback();
        } 
    }

    return {
        exec: exec
    };

})();