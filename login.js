// login.js
const base = new (require("qa-shared-base/lib/protractor-lib.js"))();
const loginLib = new (require("qa-shared-loginService/lib/loginService.js))();

loginUser = async (a,b) => {
    
     let session;
     
     session = await base.loginService.loginOAuthUser(a, b, "integration.familysearch.org", browser.getProcessedConfig().value_.notEC);
     
     let testUser = await sharedUtils.prototype.getCurrentUser(session);
     await base.cookieUtils.setSession(session);
     await browser.refresh();
 //    await browser.driver.manage().logs().get('browser');
     browser.get('http://integration.familysearch.org/dmc2');
     return testUser;
   }

filterBy = function(elements, attribute, value) {
  return elements.filter(function(elem) {
    if(elem[attribute]) {
      return elem[attribute].includes(value);
    }
  })
};


describe('DMC Login test', function() {
    
    var username = element(by.id('userName'));
    var password = element(by.id('password'));
    var goButton = element(by.id('login'));
    var userDropDown = element(by.className('current-user'));
    var integrationUserNameTestValues = 
        [   
            ["mfraser80", 1, "Data Admin 6"],
            ["jcrag", 1, "Data Admin 5"],
            ["dmcguiness", 1, "Data Admin 4"],
            ["sdoogan1", 1, "Data Admin 3"],
            ["lfuchs", 1, "Data Admin 2"],
            ["hmaris", 1, "Data Admin 1"],
            ["mmcgovern", 1, "Data Admin 6"],
            ["atorgesen", 1, "Data Admin 5"],
            ["sphillips", 1, "Data Admin 4"],
            ["mhatcher", 1, "Data Admin 3"],
            ["cmossman", 1, "Data Admin 2"],
            ["sdunrirk", 1, "Data Admin 1"], 
            ["dvjensen", 7, "Data Admin Lead"]
        ];
    var stagingUserNameTestValues = 
        [
            "mfraser80",
            "jcrag",
            "dmcguiness",
            "sdoogan1",
            "lfuchs0",
            "hmaris",
            "mmcgovern0",
            "atorgesen0",
            "sphillips0",
            "mhatcher",
            "cmossman",
            "sdunkirk"
        ];
    var passwordTestValue = '1234pass';
    // var latestResult = element(by.binding('latest'));
    

    
    // beforeEach(function() {

    //    browser.get('http://integration.familysearch.org/dmc2');
    // });


    it('should be able to login to all Data Admin levels', function() {
        var i;
        // browser.get('http://integration.familysearch.org/dmc2/');
        for(i = 0; i < integrationUserNameTestValues.length; i++) {
            loginUser(integrationUserNameTestValues[i][0], passwordTestValue);
            let userDropDownMenuItems = element.all(by.css('dropdown-menu li'));
            expect(userDropDownMenuItems.length).toBe(integrationUserNameTestValues[i][1]);
            expect(userDropDownMenuItems[0].getText()).toBe(integrationUserNameTestValues[i][2]);
        }
        // // browser.ignoreSynchronization = true;
        // // username.clear();
        // username.sendKeys("mfraser80"); //integrationUserNameTestValues[0]);
        // password.sendKeys(passwordTestValue);

        // goButton.click();

        // userDropDown.click();

        // var userDropDownMenuItems = element.all(by.css('dropdown-menu li'));
        
        // expect(userDropDownMenuItems.length).toBe(2);
        // expect(userDropDownMenuItems[0].getText()).toBe('Data Admin 6');
    

        // expect(history.last().getText()).toContain('1 + 2');

        // expect(history.first().getText()).toContain('3 + 4');
    });
});
