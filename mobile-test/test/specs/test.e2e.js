import { expect } from '@wdio/globals'
  

describe('Positive Test', () => {


it('Normal Login', async () => {

    var btn_login = $('//android.view.View[@content-desc="Login"]');
    var email = $('//android.widget.EditText[@content-desc="input-email"]');
    var password = $('//android.widget.EditText[@content-desc="input-password"]');
    var btn_signin = $('//android.view.ViewGroup[@content-desc="button-LOGIN"]/android.view.ViewGroup');
    var alert = $('//android.widget.TextView[@resource-id="android:id/message"]');
    var ok =$('//android.widget.Button[@resource-id="android:id/button1"]');

        await btn_login.click();
        await email.setValue("test@gmail.com");
        await password.setValue("password123");
        await btn_signin.click();

        await expect(alert).toExist();
        await ok.click();

    })


it('Abnormal Login', async () => {

    var btn_login = $('//android.view.View[@content-desc="Login"]');
    var email = $('//android.widget.EditText[@content-desc="input-email"]');
    var password = $('//android.widget.EditText[@content-desc="input-password"]');
    var btn_signin = $('//android.view.ViewGroup[@content-desc="button-LOGIN"]/android.view.ViewGroup');
    var alert = $('//android.widget.TextView[@text="Please enter a valid email address"]');
    var alert_pass = $('//android.widget.TextView[@text="Please enter at least 8 characters"]');

        await btn_login.click();
        await email.setValue("");
        await password.setValue("");
        await btn_signin.click();

        await expect(alert).toExist();
        await expect(alert_pass).toExist();
        
    })

})