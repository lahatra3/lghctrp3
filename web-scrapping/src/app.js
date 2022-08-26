const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const shell = require('shelljs');
const { login, timeSleep, runCommand } = require('./modules');

puppeteer.use(pluginStealth());

async function start() {
    const browser = await puppeteer.launch({ 
        headless: false,
        args: ['--disable-features=site-per-process']
    });
    const page = await browser.newPage();
    await page.goto(`https://console.cloud.google.com/welcome?project=lahatra3&authuser=1&cloudshell=true`);
    await login(page);
    await page.waitForSelector("#cloud-shell-container iframe");
    await timeSleep(23000);
    runCommand(page);
    await timeSleep(10000);
    shell.exec('pkill chrome');
}

module.exports = {
    start
}
