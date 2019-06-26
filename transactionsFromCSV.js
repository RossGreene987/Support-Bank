const readline = require('readline-sync');
const fs = require('fs');
const moment = require('moment');
moment().format();
const verify = require('./verifyData');

class Transaction{
    constructor(date, from, to, narrative, amount){
        this.Date = date;
        this.FromAccount = from;
        this.ToAccount = to;
        this.Narrative = narrative;
        this.Amount = amount;
    }
}



function newTransaction(array){
    if(verify.checkArray(array)){
        let date = array[0];
        date = moment(date, "DD/MM/YYYY");
        let from = array[1];
        let to = array[2];
        let narrative = array[3];
        let amount = +array[4];
        return new Transaction(date, from, to, narrative, amount)
    }
    return 'bad'
}


function getTransactionListCSV(filename){
    let data = fs.readFileSync(filename, 'utf8');
    let transactionList = [];
    data  = CSVToArray(data);
    data.shift();
    data.pop();
    data.forEach(function(element) {
        let nextTransaction = newTransaction(element);
        if (!(nextTransaction === 'bad')){
            transactionList.push(nextTransaction)
        }
    });

    return transactionList
}

function CSVToArray( strData, strDelimiter ){
    // Check ToAccount see if the delimiter is defined. If not,
    // then default ToAccount comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression ToAccount parse the CSV values.
    let objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array ToAccount hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array ToAccount hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check ToAccount see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ){

            // Since we have reached a new row of data,
            // add an empty row ToAccount our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check ToAccount see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it ToAccount the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

exports.getTransactionListCSV = getTransactionListCSV;

