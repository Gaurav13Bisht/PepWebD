//                                                            WEB SCRAPPER

require('chromedriver');
const fs = require("fs");
let wd = require('selenium-webdriver');
let browser = new wd.Builder().forBrowser('chrome').build();
let batsmenColumns = ["runs", "ballsPlayed", "fours", "sixes", "strikeRate"];     // This is for the format of our script's Output
let UrlMatches = [];

let count = 0;
let finalData = [];

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

async function main() {

    await browser.get("https://www.cricbuzz.com/cricket-series/3130/indian-premier-league-2020/matches");
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-col-75.cb-col .cb-col-60.cb-col.cb-srs-mtchs-tm a.text-hvr-underline")));       // All these elements are first observed through INSPECT option in chrome then used here.
    let Totalmatches = await browser.findElements(wd.By.css(".cb-col-75.cb-col .cb-col-60.cb-col.cb-srs-mtchs-tm a.text-hvr-underline"));

    for (let i1 in Totalmatches) {
        UrlMatches.push(await Totalmatches[i1].getAttribute("href"));
    }
    for (let i2 in UrlMatches) {
        await job(UrlMatches[i2]);
        if (count == 5) {
            fs.writeFileSync("hahah.json", JSON.stringify(finalData));
            break;
        }
    }
}
async function job(url) {
    await count++;
    let browser = new wd.Builder().forBrowser('chrome').build();
    await browser.get(url);
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-nav-bar a")));       // All these elements are first observed through INSPECT option in chrome then used here.
    let buttons = await browser.findElements(wd.By.css(".cb-nav-bar a"));
    await buttons[1].click();

    await wait(2000);


    await browser.wait(wd.until.elementLocated(wd.By.css("#innings_1 .cb-col.cb-col-100.cb-ltst-wgt-hdr")));
    let tables = await browser.findElements(wd.By.css("#innings_1 .cb-col.cb-col-100.cb-ltst-wgt-hdr"));

    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-col.cb-col-100.cb-scrd-hdr-rw span")));
    let heading = await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-hdr-rw span"));
    let teamName = await heading[0].getAttribute("innerText");
    finalData.push({ "teamName": teamName });


    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms")));
    let batsmenRows = await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));

    for (let i3 in batsmenRows) {
        await browser.wait(wd.until.elementLocated(wd.By.css("div")));
        let columns = await batsmenRows[i3].findElements(wd.By.css("div"));
        if (columns.length != 7)
            break;

        let inningsBatsmen = {};
        for (let i4 in columns) {
            if (i4 == 1)
                continue;
            if (i4 == 0) {
                var playerName = await columns[0].getAttribute('innerText');
                continue;
            }
            inningsBatsmen[batsmenColumns[i4 - 2]] = await columns[i4].getAttribute('innerText');
        }
        let len = finalData.length;
        finalData[len - 1].push(playerName);
        finalData[len - 1].playerName = [];
        finalData[len - 1].playerName.push(inningsBatsmen);
    }
    await browser.close();
}

main();
