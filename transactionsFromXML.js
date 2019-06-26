const fs = require('fs');
const verify = require('./verifyData');
const parseString = require('xml2js').parseString;

function getTransactionListXML(file){
    let data = fs.readFileSync(file, 'utf8');
    parseString(data, function (err, result) {
        console.dir(result);
    });
    //console.log(data);
    return data
}

exports.getTransactionListXML = getTransactionListXML;