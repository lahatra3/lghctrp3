async function login(page) {
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', process.env.GMAIL_USER);
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);
    
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GMAIL_PASS);
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" })
    ]);
}

async function runCommand(page) {
    const commands = "cd ~/lghctrp3 && git pull && cd api && nvm use --lts && npm install && nest build && nest start";
    commands.split("").forEach(async (value) => await page.keyboard.press(value));
    await page.keyboard.press('Enter');
}

function timeSleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

module.exports = {
    login,
    runCommand,
    timeSleep
}
