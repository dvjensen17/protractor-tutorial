const base = new (require("qa-shared-base/lib/protractor-lib.js"))();

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