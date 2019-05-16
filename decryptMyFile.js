let util = new(require('qa-shared-base-utils/utilityMethods.js'));
let fs = require('fs');

let testRoles = [ "Data Admin 1", "Data Admin 2", "Data Admin 3", "Data Admin 4", "Data Admin 5", "Data Admin 6" ];

let attributeOfInterest = "role";

let filterText = "Data Admin";

let environment = "Integ"

let userData =
[
    {
        username: "dvjensen",
        role: "Data Admin 6",
        firstName: "David"
    },
    {
        username: "jfuchs",
        role: "Data Admin 1",
        firstName: "Joe"
    },
    {
        username: "dmohawk",
        role: "Data Admin 1",
        firstName: "Dubbie"
    },

];

let decryptFile = (fileName) => {
    let fileText = "";
    fileText = util.decryptFile(fileName);
    return fileText;
}

function parseResultFile(txtFile) {
    userDataJson = txtFile;
}

// let lookAtElem = function(elem, pos, bucket) {
//     if(elem[atrribute]) {

//     }
// };

// let _ifIncludes = (elem, attr, val) => {
//     if(elem[attr]) {
//         return elem[attr].includes(val);
//     }
// }

let filterBy = function(elements, attribute, value) {
    return elements.filter((elem) => {
      if(elem[attribute]) {
        return elem[attribute].includes(value);
        }
    });
};

let msg1 = "Entering decryptFile.js in Protractor Tutorial";
console.log(msg1);

// let testUsersTxt = decryptFile("./data/en-info.txt");
// console.log(testUsersTxt);
// let testUsersObj = JSON.parse(testUsersTxt);
// let usr = [];
// for(let i = 0; i < result.length; i++) {
//     usr = filterBy(testUsersObj, attributeOfInterest, filterText);
//     usr = filterBy(usr, attributeOfInterest, environment);
//     console.log(usr[usr.length - 1].username + " " + usr[usr.length - 1].firstName + " " + usr[usr.length - 1].lastName + " " + usr[usr.length - 1].role + " The number of elements: " + usr.length);
// }
// let testUsersObj = decryptFile("./data/en-info.txt");
module.exports.getLoginPage = async (login) => {
    await browser.get(login);
    await browser.executeScript('window.localStorage.clear();');
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.driver.manage().deleteAllCookies();
    // return browser;
}

module.exports.getDataAdminUsers = async () => {
    let users = await decryptFile("./data/en-info.txt");
        // .then(result => {
        // // console.log(result);
    let usr = [];
    for(let i = 0; i < users.length; i++) {
        usr = filterBy(JSON.parse(users), attributeOfInterest, filterText);
        usr = filterBy(usr, attributeOfInterest, environment);
    }
    console.log(usr[0].username + " " + usr[0].password + " " + usr[0].firstName + " " + usr[0].lastName + " " + usr[0].role + " The number of elements: " + usr.length);
    return usr;
        // // result2.then(result3 => console.log(result3));
        // })
        // .catch(error => console.log(error));
    }

// let dataAdminUserInEnv = getDataAdminUsers(attributeOfInterest, filterText, environment);

// console.log(testUsersObj);

// getUserDataJson = JSON.parse(fs.readFile("./data/info.txt", (err, data) => {
//     if(err) throw err;
//     return data;
//     })
// );

// userDataJson = getUserDataJson();

// let user = filterBy(testUsersObj, "username", userName);

// let msg2 = "Their should be a username: " + userName + " in the decrypted file.\nThese are the roles: ";
// console.log(msg2);