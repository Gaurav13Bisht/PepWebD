//                                                            WEB SCRAPPER

require('chromedriver');
let wd = require('selenium-webdriver');
let browser = new wd.Builder().forBrowser('chrome').build();

let matchId = 32262;  // Match unique ID whose details our script will scrap from their website.
let inningss = 2;      // fr?

let batsmenColumns = ["BatsmanName", "out", "runs", "ballsPlayed", "fours", "sixes", "strikeRate"];     // This is for the format of our script's Output

let innings1Batsmen = [];

let bowlersColumns = ["BowlerName", "Overs", "Maidens", "RunsConcede", "WicketsTaken", "Noballs", "WideBalls", "Economy"];     // This is for the format of our script's Output

let innings1Bowlers = [];

async function main() {
    await browser.get(`https://www.cricbuzz.com/live-cricket-scores/${matchId}`);
    await browser.wait(wd.until.elementLocated(wd.By.css(".cb-nav-bar a")));       // All these elements are first observed through INSPECT option in chrome then used here.
    let buttons = await browser.findElements(wd.By.css(".cb-nav-bar a"));
    await buttons[1].click();
    await browser.wait(wd.until.elementLocated(wd.By.css(`#innings_${inningss} .cb-col.cb-col-100.cb-ltst-wgt-hdr`)));
    let tables = await browser.findElements(wd.By.css(`#innings_${inningss} .cb-col.cb-col-100.cb-ltst-wgt-hdr`));
    let innings1BatsmenRows = await tables[0].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));

    for (let i = 0; i < (innings1BatsmenRows.length); i++) {      // Last three index have useless values according to our need that's why we are avoiding them.
        let columns = await innings1BatsmenRows[i].findElements(wd.By.css("div"));
        if (columns.length != 7)
            break;
        let data = {};
        for (j in columns) {
            if (j != 1) {           // we have "out" description in column[1] and we dont wanna include it in our script output.
                data[batsmenColumns[j]] = await columns[j].getAttribute("innerText");
            }
        }
        innings1Batsmen.push(data);
    }
    console.log(innings1Batsmen);


    let innings1BowlersRows = await tables[1].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-itms"));

    for (let i = 0; i < (innings1BowlersRows.length); i++) {      // Last three index have useless values according to our need that's why we are avoiding them.
        let columns = await innings1BowlersRows[i].findElements(wd.By.css("div"));
        if (columns.length != 8)
            break;
        let data = {};
        for (j in columns) {
            data[bowlersColumns[j]] = await columns[j].getAttribute("innerText");
        }
        innings1Bowlers.push(data);
    }
    console.log(innings1Bowlers);

}
main();
