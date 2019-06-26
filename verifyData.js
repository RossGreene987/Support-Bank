const log4js = require('log4js');

const logger = log4js.getLogger();

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'DebugLog' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

function checkArray(array){



    if(!checkDate(array[0])){
        logger.error(`Date not parsed, not in correct format. Transaction ${array} has not been added
        `);

        return false
    }
    if(!checkAmount(array[4])){
        logger.error( `Transaction ${array} has not been processed
        `)
        return false
    }
    return true
}

function checkDate(date){
    return (date[2] === '/' && date[5] === '/' && isInteger(date.split('/').join('')) && date.length === 10)
}

function isInteger(number){
    return ((+number > 0))
}

function checkAmount(amount){
    if (!(+amount > 0)){
        logger.error('Amount is not a positive number');
        return false
    }
    return true
}

exports.checkArray = checkArray;
