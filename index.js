
const readline = require('readline-sync');
const getCSV = require('./transactionsFromCSV')


class Person{
    constructor(name, assets) {
        this.name = name;
        this.assets = assets;
        Person.population.push(this);
        Person.population++;
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
    // let index = 0;
    // for(let i=0; i < population.length; i++) {
    //     if (population[i].name === name){
    //         index = i;
    //     }
    // }
    // return index;

    return population.findIndex((person) => {
        return person.name === name;
    })
}

function listAll(file){
    let transactionList =getCSV.getTransactionList(file);

    let population = [];
    transactionList.forEach(function(element) {

        if (!isInPopulation(element.from,population)){
            population.push(new Person(element.from,0))
        }
        if (!isInPopulation(element.to,population)){
            population.push(new Person(element.to,0))
        }
        let fromIndex = indexOf(element.from, population);
        let toIndex = indexOf(element.to, population);
        population[fromIndex].assets -= element.amount;
        population[toIndex].assets += element.amount;

    });
    console.log(population);
}

function list(name, file){
    let transactionList = getCSV.getTransactionList(file);
    let myTransactions = transactionList.filter(function(item) {
        return (item.from === name || item.to === name);
    });
    console.log( myTransactions )
}


listAll('DodgyTransactions2015.csv');
list('Todd', 'DodgyTransactions2015.csv');
console.log("This: " + Person.population);







