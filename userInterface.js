const readline = require('readline-sync');

function performOneAction(){
    console.log("Welcome to the Support bank");
    let year;
    const goodYears = ['2012','2013','2014','2015'];
    do {
        year = userInput("Which year would you like to see?")
    } while (goodYears.includes(year));
    let file = year2file(year);

    const goodActions = ['1','2','3','4'];
    let actionRequired
    do {
        actionRequired = userInput(`What Function would you like?
        (1): LIST ALL names with their credit
        (2): LIST one single account and all transactions associated with it 
        (3): IMPORT FILE from disk
      
        (4): END`);
    } while (goodActions.includes(actionRequired));

    return file, actionRequired
}

function year2file(year){
    let file;
    switch (year) {
        case 2012:
            file = 'Transactions2012.xml';
            break;
        case 2013:
            file = 'Transactions2013.json';
            break;
        case 2014:
            file = 'Transactions2014.csv';
            break;
        case 2015:
            file = 'DodgyTransactions2015.csv';
            break;
        default: //optional but good practise
            console.log("Oops");
            break;
    }
    return file
}

function userInterface(){
    performOneAction()
}

function getFile(){
    let year;
    const goodYears = ['2012','2013','2014','2015'];
    year = userInput()

    const goodActions = ['1','2','3','4'];
    let actionRequired
    do {
        actionRequired = userInput(`What Function would you like?
        (1): LIST ALL names with their credit
        (2): LIST one single account and all transactions associated with it 
        (3): IMPORT FILE from disk
      
        (4): END`);
    } while (goodActions.includes(actionRequired));

    return file, actionRequired
}
function userInput(prompt, allowed= []){
    let response;
    if (!(allowed === [])){
        do {
            response = userInput(prompt)
        } while (allowed.includes(response));
    } else {
        response = userInput(prompt)
    }

    return response
}



