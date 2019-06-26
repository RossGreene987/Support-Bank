const getCSV = require('./transactionsFromCSV')
const getJSON = require('./transactionsFromJSON')
const getXML = require('./transactionsFromXML')

class Person{
    constructor(name, assets) {
        this.name = name;
        this.assets = assets;
    }
}

function isInPopulation(name, population){
    // let isin = false;
    // population.forEach(function(element) {
    //     if (element.name === name) {
    //         isin = true
    //     }
    // });
    // return isin

    return population.some((element) => {
        return element.name === name;
    });
}

function indexOf(name, population){
    return population.findIndex((person) => {
        return person.name === name;
    })
}

function getPopulationFromTransactions(transactionList) {
    //
    // let fromPeople = transactionList.map((transaction) => {
    //     return new Person(transaction.FromAccount, 0);
    // });
    //
    // let toPeople = transactionList.map((transaction) => {
    //     return new Person(transaction.ToAccount, 0);
    // });
    //
    // let allPeople = fromPeople.concat(toPeople);
    // // do something to remove duplicates
    //
    // transactions.forEach((transaction) {
    //
    // })
    //
    //
    // let fromIndex = indexOf(element.FromAccount, population);
    // let toIndex = indexOf(element.ToAccount, population);
    // population[fromIndex].assets -= element.Amount;
    // population[toIndex].assets += element.Amount;
    let population = [];
    transactionList.forEach(function (element) {
        if (!isInPopulation(element.FromAccount, population)) {
            population.push(new Person(element.FromAccount, 0))
        }
        if (!isInPopulation(element.ToAccount, population)) {
            population.push(new Person(element.ToAccount, 0))
        }
        let fromIndex = indexOf(element.FromAccount, population);
        let toIndex = indexOf(element.ToAccount, population);
        population[fromIndex].assets -= element.Amount;
        population[toIndex].assets += element.Amount;
    });
    return population;
}

function listAll(file){
    let transactionList = getTransactionList(file);
    let population = getPopulationFromTransactions(transactionList);
    console.log(population);
}

function getTransactionList(file) {
    let filename = file;
    let transactionList;
    if (filename.slice(-3) === 'csv') {
        transactionList = getCSV.getTransactionListCSV(file);
    } else if (filename.slice(-4) === 'json') {
        transactionList = getJSON.getTransactionListJSON(file);
    } else if (filename.slice(-3) === 'xml') {
        transactionList = getXML.getTransactionListXML(file)
    }
    return transactionList;
}

function list(name, file){

    let transactionList = getTransactionList(file);

    let myTransactions = transactionList.filter(function(item) {
        return (item.FromAccount === name || item.ToAccount === name);
    });
    console.log( myTransactions )
}

function main(){
    let actionRequired = userInput(`What Function would you like?
        (1): LIST ALL names with their credit
        (2): LIST one single account and all transactions associated with it 
        (3): IMPORT FILE from disk
      
        (4): END`);

    switch (actionRequired) {
        case '1':
            //Get year then list all;
            break;
        case '2':
            // get year and name then do
            break;
        case '3':
            // to implement
            break;
        case '4':
            stop()
    }
}

getTransactionList('Transactions2012.xml')
listAll('Transactions2012.xml');
list('Todd', 'Transactions2012.xml');

//main()
