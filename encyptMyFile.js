var util = new(require('qa-shared-base-utils/utilityMethods.js'));
// import * as base from './node_modules/qa-shared-base-utils';

var msg1 = "Entering encryptFile.js in Protractor Tutorial";
console.log(msg1);

util.encryptFile("./data/info.txt", "./data/en-info.txt");

var msg2 = "Their should be an new encrypted file in the data folder.";
console.log(msg2);
