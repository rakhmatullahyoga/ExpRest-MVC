/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

console.time('Total application preparation time');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

console.info('Starting app...');

// LOAD APPLICATION'S CONSTANTS
console.time('Loading app constants');
let CONSTANTS = require('./src/main/configs/constants');
console.timeEnd('Loading app constants');

// DEFINE ALL MODULES
console.time('Loading app modules');
let MODULES = require(CONSTANTS.PATH.APPLICATION_MODULES);
console.timeEnd('Loading app modules');

// INITIALIZE TOOLS, LIBRARIES AND WHOLE APPLICATION
function initiateTools (callback) {
    require(CONSTANTS.PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS, callback);
}

// STARTING APPLICATION SERVER (Express, RPC, etc)
function initiateAppServers (err, tools) {
    if (err) {
        throw err;
    } else {
        console.timeEnd('Total application preparation time');

        // Initialize express server
        require(CONSTANTS.PATH.EXPRESS_SERVER)(tools, MODULES, CONSTANTS, process.env.APP_PORT);
    }
}

// DOING ASYNC.waterfall BECAUSE SEVERAL PROCESS NEEDS BLOCKING PROCESSING
MODULES.ASYNC.waterfall([initiateTools], initiateAppServers);
