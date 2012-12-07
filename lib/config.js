var fs = require('fs');
var path = require('path');
var abc = require('abc');

exports.get = getConfig;

function getConfig (caseDir, callback) {
    loadConfig(caseDir, function (config) {
        if (!config) {
            config = {};
        }
        if (!config.exec) {
            config.exec = require('./executers/code.js').exec;
        }
        callback(config);
    }); 
}

function loadConfig (caseDir, callback) {
    var configFile = path.join(caseDir, 'tc.config.js');
    
    var configToJSON = function (text) {
        var config = null;
        if (text) {
            try {
                eval('config=' + text);
            } catch (e) {
                console.log(configFile + ' - parse error');
                console.log(e);
            }
        }
        callback(config);
    }

    fs.exists(configFile, function (exists) {
        if (exists) {
            abc.file.read(configFile, configToJSON)
        } else {
            configToJSON(null);
        }
    })
}