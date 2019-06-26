
const readline = require('readline-sync');
const getCSV = require('./transactionsFromCSV')
const getJSON = require('./transactionsFromJSON')

class Person{
    constructor(name, assets) {
        this.name = name;
        this.assets = assets;
    }
}

function isInPopulation(name, population){
    let isin = false;
    population.forEach(function(element) {
        if (element.name === name) {
            isin = true
        }
    });
    return isin
}

function indexOf(name, population){
    return population.findIndex((person) => {
        return person.name === name;
    })
}

function getPopulationFromTransactions(transactionList) {
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
    let filename = file
    let transactionList;
    if (filename.slice(-3) === 'csv') {
        transactionList = getCSV.getTransactionListCSV(file);
    } else if (filename.slice(-4) === 'json') {
        transactionList = getJSON.getTransactionListJSON(file);
    }
    return transactionList
}

function list(name, file){
    let transactionList = getTransactionList(file);

    let myTransactions = transactionList.filter(function(item) {
        return (item.FromAccount === name || item.ToAccount === name);
    });
    console.log( myTransactions )
}

listAll('Transactions2013.json');
list('Todd', 'Transactions2013.json');
