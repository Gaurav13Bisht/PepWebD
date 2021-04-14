const pup = require("puppeteer");

// Use your ID and PASSWORD
let id = "";
let pwd = "";

let goodcom = "Loved it !!";
let badcom = "You could do way bLetsetter !";

let browserPromise = pup.launch({
    headless: false,
    defaultViewport: false
});

//for first mail operation
let brow;
browserPromise.then(function (browser) {
    brow = browser;
    let pagesPromise = browser.pages();
    return pagesPromise;
}).then(function (pages) {
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
    return pageOpenPromise;
}).then(function () {
    let waitPromise = tab.waitForSelector(".whsOnd.zHQkBf ", { visible: true });
    return waitPromise;
}).then(function () {
    let allclassPromise = tab.click(".whsOnd.zHQkBf");
    return allclassPromise;
}).then(function () {
    let idPromise = tab.type("#identifierId", id);
    return idPromise;
}).then(function () {
    let nextbtnPromise = tab.click(".VfPpkd-RLmnJb");
    return nextbtnPromise;
}).then(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
}).then(function () {
    let pwdclassPromise = tab.click(".whsOnd.zHQkBf");
    return pwdclassPromise;
}).then(function () {
    let pwdPromise = tab.type(".whsOnd.zHQkBf", pwd);
    return pwdPromise;
}).then(function () {
    let nextbtnPromise = tab.click(".VfPpkd-RLmnJb");
    return nextbtnPromise;
}).then(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, 5000);
    })
}).then(function () {
    let pageOpenPromise = tab.goto("https://www.youtube.com/");
    return pageOpenPromise;
}).then(function () {
    let waitPromise = tab.waitForSelector("a[title='Explore']", { visible: true });
    return waitPromise;
}).then(function () {
    let clickPromise = tab.click("a[title='Explore']");
    return clickPromise;
}).then(function () {
    let sectionPromise = tab.waitForSelector("#destination-content-root", { visible: true });
    return sectionPromise;
}).then(function () {
    let getPromise = tab.$$("#destination-content-root");
    return getPromise;
}).then(function (data) {
    let urlFetchPromise = tab.evaluate(function (ele) {
        return ele.getAttribute("href");
    }, data[0]);
    return urlFetchPromise;
})// 
    .then(function (data) {
        let clickTrending = tab.goto("https://www.youtube.com/" + data);
        return clickTrending;
    })
    // .then(function(){
    //     let vidPromise = tab.waitForSelector(".text-wrapper.style-scope.ytd-video-renderer", {visible : true});
    //     return vidPromise;
    // })
    // .then(function(){
    //     let videoPromise = tab.$$(".text-wrapper.style-scope.ytd-video-renderer");
    //     return videoPromise;
    // })
    .then(function () {
        let vidPromise = tab.waitForSelector("div[id='title-wrapper']", { visible: true });
        return vidPromise;
    })
    .then(function () {
        let playPromise = tab.$$("a[id='video-title']");
        return playPromise;

    }).then(function (data) {
        let urlFetchPromises = [];
        for (let i in data) {
            if (i >= 3 && i <= 8)
                continue;
            if (i == 12)
                break;

            let urlFetchPromise = tab.evaluate(function (ele) {
                return ele.getAttribute("href");
            }, data[i]);
            urlFetchPromises.push(urlFetchPromise);
        }
        return Promise.all(urlFetchPromises);
    }).then(function (data) {
        let problemSolvedPromise = DisOrlikeComment("https://www.youtube.com" + data[0]);
        for (let i = 1; i < data.length; i++) {
            problemSolvedPromise = problemSolvedPromise.then(function () {
                return DisOrlikeComment("https://www.youtube.com" + data[i]);
            });
        }
    }).catch(function (err) {
        console.log(err);
    })
//////////////////////////////////////////////////////////////////////////////


function DisOrlikeComment(url) {
   
}