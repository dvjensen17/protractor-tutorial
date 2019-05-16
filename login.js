// login.js
const base = new (require("qa-shared-base/lib/protractor-lib.js"))();
const fs = require("fs");
const local = require("./decryptMyFile");
const host = "integration.familysearch.org";
const testRoles = [ "Data Admin 1", "Data Admin 2", "Data Admin 3", "Data Admin 4", "Data Admin 5", "Data Admin 6" ];
const environment = "Integ";
const expect = require("chai").expect;
const ec = protractor.ExpectedConditions;

let userTabs = new Map();
userTabs.set('Data Admin 1', ["Person", "Relationship", "CTR", "OWS", "Reservation", "User", "Unit", "Search", "Tools"]);
userTabs.set('Data Admin 2', ["Person", "Relationship", "CTR", "OWS", "Request", "Reservation", "User", "Unit", "Search", "Tools"]);
userTabs.set('Data Admin 3', ["Person", "Relationship", "CTR", "OWS", "Request", "Reservation", "User", "Unit", "Queues", "Search", "Tools"]);
userTabs.set('Data Admin 4', ["Person", "Relationship", "CTR", "OWS", "Request", "Temple", "Reservation", "User", "Unit", "Queues", "Search", "Tools"]);
userTabs.set('Data Admin 5', ["Person", "Relationship", "CTR", "OWS", "Request", "Temple", "Reservation", "User", "Unit", "Queues", "Search", "Tools"]);
userTabs.set('Data Admin 6', ["Person", "Relationship", "CTR", "OWS", "Request", "Temple", "Reservation", "User", "Unit", "Queues", "Search", "Tools"]);

let getUserSessions = async () => {
    let testUserCredentials = await local.getDataAdminUsers();

    for(let i = 0; i < testUserCredentials.length; i++) {
        let sessionBuffer = await base.loginService.loginOAuthUser(testUserCredentials[i].username, testUserCredentials[i].password, host, browser.getProcessedConfig().value_.notEC);
        testUserCredentials[i].session = sessionBuffer;
    }
    return testUserCredentials;
};

let filterBy = function(elements, attribute, value) {
    return elements.filter(function(elem) {
        if(elem[attribute]) {
        return elem[attribute].includes(value);
        }
    })
};

// function loginPage() {
//     this.get = async function(url) {
//         await browser.get(url);
//         await browser.executeScript('window.localStorage.clear();');
//         await browser.executeScript('window.sessionStorage.clear();');
//         await browser.driver.manage().deleteAllCookies();
//         // return browser;
//     }
// }

let cleanArrayOfNulls = (subjectArray) => {
    let bufferArray = [...subjectArray];
    for(let i = 0; i < bufferArray.length; i++) {
        if(bufferArray[i] === "") {
            bufferArray.splice(i,1);
            i--;
        }
    }
    return bufferArray;
}

let userDropDownMenuTextArray = async (elementArrayFinder) => {
    let textArray = [];
    let elementArrayFinderLength = await elementArrayFinder.length;
    for(let k = 0; k < elementArrayFinderLength; k++) {
        textArray.push(await elementArrayFinder[k].getText());
    }
    return textArray;
};

let testUsers = getUserSessions();

describe('DMC Login test', function() {


    it('should be able to login to all Data Admin levels', async () => {
        for (let j = 0; j < testRoles.length; j++) {
            await local.getLoginPage(browser.testEnv.rootUrl);
            let testRoleUsers = filterBy(await testUsers, "role", testRoles[j]);
            testRoleUsers = filterBy(testRoleUsers, "role", environment);
            for(let i = 0; i < testRoleUsers.length; i++) {
                await browser.manage().addCookie({name: 'fsSessionId', value: testRoleUsers[i].session, path: '/dmc2'})
                await browser.manage().addCookie({name: 'fsAssignment', value: testRoles[j], path: '/dmc2'})
                await browser.refresh();
                await browser.get('/dmc2/');
                // await browser.wait(ec.presenceOf($('#login span.current-user')), 5000);
                // 'ul.dropdown-menu.roles-list li[role="menuitem"]'
                await browser.sleep(3000);
                // debugger
                await (await element(by.css('#login span.current-user'))).click()
                let userDropDownMenuItems = await element.all(by.css('ul.dropdown-menu.roles-list li[role="menuitem"]'));
                let textArray = await userDropDownMenuTextArray(await userDropDownMenuItems);
                // let elementArrayFinderLength = await userDropDownMenuItems.length;
                // for(let k = 0; k < elementArrayFinderLength; k++) {
                //     textArray.push(await userDropDownMenuItems[k].getText());
                // }
                console.log('Array of text in elements: ' + textArray);
                // console.log(await userDropDownTextArray(await userDropDownMenuItems));
                // let userDropDownMenuTextItems = await userDropDownMenuText(userDropDownMenuItems);
                // for(let l = 0; l < userDropDownMenuItems.length; l++) {
                //     console.log("\nMenu item " + (l + 1) + " = " + await element.by.id('currentSelectedRole').getText());
                // }
                // debugger
                expect(await userDropDownMenuItems.length).to.equal((testRoleUsers[i].role.match(/Data Admin/g) || []).length);
                expect(textArray).to.include(testRoles[j]);
                await browser.sleep(3000);
                // debugger
                let userShowingTabs = await element.all(by.css('ul.nav-pills li a'));
                textArray = cleanArrayOfNulls(await userDropDownMenuTextArray(await userShowingTabs)).sort();
                expect(textArray).to.deep.equal(userTabs.get(testRoles[j]).sort());
                await browser.get('auth/logout');
                // await browser.restart();
            }
        }
    });
});
