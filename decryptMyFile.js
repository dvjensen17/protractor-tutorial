let util = new(require('qa-shared-base-utils/utilityMethods.js'));
let fs = require('fs');

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

function parseResultFile(txtFile) {
    userDataJson = txtFile;
}

let userDataJson = "";
let userName = "dvjensen";

// let lookAtElem = function(elem, pos, bucket) {
//     if(elem[atrribute]) {

//     }
// };


let filterBy = function(elements, attribute, value) {
    return elements.filter(function(elem) {
      if(elem[attribute]) {
        return elem[attribute].includes(value);
        }
    });
};

let msg1 = "Entering decryptFile.js in Protractor Tutorial";
console.log(msg1);

// let decryptFile = util.decryptFile("./data/en-info.txt");

// decryptFile.then(parseResultFile(decryptFile));

// console.log(decryptFile);

getUserDataJson = JSON.parse(fs.readFile("./data/info.txt", (err, data) => {
    if(err) throw err;
    return data;
    })
);

userDataJson = getUserDataJson();

let user = filterBy(userDataJson, "username", userName);

let msg2 = "Their should be a username: " + userName + " in the decrypted file.\nThese are the roles: " + user[0].role;
console.log(msg2);