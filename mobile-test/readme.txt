Testing made with javascript

How to test Mobile
What we need to install:
-Appium
-Android studio (SDK & Emulator)

Install through cmd
@wdio/allure-reporter
@wdio/appium-service
@wdio/local-runner
@wdio/mocha-framework
@wdio/spec-reporter
appium-uiautomator2-driver
ts-node

After everything installed, 
run with this comand on cmd :
npx wdio run wdio.conf.js

To check report,
npx allure serve allure-results