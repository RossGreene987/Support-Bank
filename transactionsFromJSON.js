const fs = require('fs');
const verify = require('./verifyData');


function getTransactionListJSON(file){
    let data = fs.readFileSync(file, 'utf8');
    data = JSON.parse(data);
    data.forEach(function(element) {
    });
    return data
}

exports.getTransactionListJSON = getTransactionListJSON;

