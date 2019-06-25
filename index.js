const fs = require('fs');
const readline = require('readline-sync');

class person{
    constructor(name, assets) {
        this.name = name
        this.assets = assets
    }
}

class transaction{
    constructor(date, from, to, narrative, amount){
        this.date = date
        this.from = from
        this.to = to
        this.narrative = narrative
        this.amount = amount
    }
}

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
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


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
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
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

function newTransaction(array){
    let date = array[0];
    let from = array[1];
    let to = array[2];
    let narrative = array[3];
    let amount = +array[4];
    return new transaction(date, from, to, narrative, amount)
}

function getTransactionList(filename){
    let data = fs.readFileSync(filename, 'utf8');
    let transactionList = [];
    data  = CSVToArray(data);
    data.forEach(function(element) {
        transactionList.push(newTransaction(element))
    });
    return transactionList

}

function isInPopulation(name, population){
    let isin = false;
    population.forEach(function(element) {
        if (element.name == name){
            isin = true
        }; });
    return isin
}

function indexOf(name, population){
    let index = 0
    for(let i=0; i < population.length; i++){
        if (population[i].name == name){
            index = i
        }
    }
    return index
}

function listAll(){
    let transactionList = getTransactionList('Transactions2014.csv');
    transactionList.shift();
    transactionList.pop();
    let population = [];
    transactionList.forEach(function(element) {
        console.log(element);

        if (!isInPopulation(element.from,population)){
            population.push(new person(element.from,0))
        }
        if (!isInPopulation(element.to,population)){
            population.push(new person(element.to,0))
        }
        let fromIndex = indexOf(element.from, population);
        let toIndex = indexOf(element.to, population);
        population[fromIndex].assets -= element.amount;
        population[toIndex].assets += element.amount;

        console.log(population)
    });

    console.log(population);

}

listAll();


