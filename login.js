// spec.js
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
    var passwordTestValue = '1234pass'
    // var latestResult = element(by.binding('latest'));
    

    loginUser = async (a, b, c, d) => {
        await username.sendKeys(a);
        await password.sendKeys(b);
        await goButton.click();
        await userDropDown.click();
        let userDropDownMenuItems = await element.all(by.css('dropdown-menu li'));
        expect(userDropDownMenuItems.length).toBe(c);
        expect(userDropDownMenuItems[0].getText()).toBe(d);
      }

    beforeEach(function() {
        browser.get('http://integration.familysearch.org/dmc2');
    });


    it('should be able to login to all Data Admin levels', function() {
        var i;
        // browser.get('http://integration.familysearch.org/dmc2/');
        for(i = 0; i < integrationUserNameTestValues.length; i++) {
            loginUser(integrationUserNameTestValues[i][0], passwordTestValue, integrationUserNameTestValues[i][1], integrationUserNameTestValues[i][2]);
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
