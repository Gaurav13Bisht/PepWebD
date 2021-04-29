const pup = require("puppeteer");

// The ID I have used while building this script is registered with my mobile number
// so please Use your ID and PASSWORD
let id = "";
let pwd = "";

let youtuber = "Seedhe Maut";  // Enter the Youtube Channel name you want to support.
let goodcom = "Loved this track!!";  // Enter the comment on the video.
let vids = 5; //  Enter the no. of videos you want to like and comment on.
// Note : It should be atleast the no. of videos uploaded on that channel.
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
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}).then(function () {
    let waitPromise = tab.waitForSelector("div[id='search-input']", { visible: true });
    return waitPromise;
}).then(function () {
    let clickPromise = tab.click("div[id='search-input']");
    return clickPromise;
}).then(function () {
    let typedChannel = tab.type("div[id='search-input']", youtuber);
    return typedChannel;
}).then(function () {
    return tab.keyboard.press("Enter");
}).then(function () {
    let waitPromise = tab.waitForSelector("div[id='content-section']", { visible: true });
    return waitPromise;
}).then(function () {
    let clickPromise = tab.click("div[id='content-section']");
    return clickPromise;
}).then(function () {
    // let waitPromise = tab.waitForSelector("tp-yt-paper-button[aria-label='Subscribe to Milad Mirg.']", { visible: true });
    let waitPromise = tab.waitForSelector(".style-scope.ytd-subscribe-button-renderer", { visible: true });
    return waitPromise;
}).then(function () {
    // let clickPromise = tab.click("tp-yt-paper-button[aria-label='Subscribe to Milad Mirg.']");
    let clickPromise = tab.click(".style-scope.ytd-subscribe-button-renderer");
    return clickPromise;
}).then(function () {
    let waitPromise = tab.waitForSelector(".tab-content.style-scope.tp-yt-paper-tab", { visible: true });
    return waitPromise;
}).then(function () {
    let getPromise = tab.$$(".tab-content.style-scope.tp-yt-paper-tab");
    return getPromise;
}).then(function (data) {
    let videosPromise = data[1].click();
    return videosPromise;
}).then(function () {
    let waitPromise = tab.waitForSelector(".yt-simple-endpoint.style-scope.ytd-grid-video-renderer", { visible: true });
    return waitPromise;
}).then(function () {
    let getPromise = tab.$$(".yt-simple-endpoint.style-scope.ytd-grid-video-renderer");
    return getPromise;
}).then(function (data) {
    let urlFetchPromises = [];
    for (let i of data) {
        let urlFetchPromise = tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, i);
        urlFetchPromises.push(urlFetchPromise);
    }
    return Promise.all(urlFetchPromises);
}).then(function (data) {
    let donePromise = likeComment("https://www.youtube.com" + data[0]);
    for (let i = 1; i <= vids; i++) {
        donePromise = donePromise.then(function () {
            return likeComment("https://www.youtube.com" + data[i]);
        });
    }
    
}).catch(function (err) {
    console.log(err);
})


function likeComment(url) {
    return new Promise(function (resolve, reject) {
        tab.goto(url)
            .then(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                })
            })
            .then(function () {
                // LIKE
                let likeSelectorPromise = tab.waitForSelector("path[d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z']", { visible: true });
                return likeSelectorPromise;
            })
            .then(function () {
                // LIKE
                let likedPromise = tab.click("path[d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z']");
                return likedPromise;
            }).then(function () {
                let commentBoxPromise = tab.waitForSelector("div[id='placeholder-area']", { visible: true });
                return commentBoxPromise;
            })
            .then(function () {
                let clickCommentBox = tab.click("div[id='placeholder-area']");
                return clickCommentBox;
            }).then(function () {
                // GOOD COMMENT
                let typedComment = tab.type("div[id='placeholder-area']", goodcom);
                return typedComment;
            }).then(function () {
                let clickCommentFind = tab.waitForSelector(".style-scope.ytd-button-renderer.style-primary.size-default", { visible: true });
                return clickCommentFind;
            }).then(function () {
                let clickCommentBox = tab.click(".style-scope.ytd-button-renderer.style-primary.size-default");
                return clickCommentBox;
            }).then(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(() => {
                        resolve();
                    }, 4000);
                })
            }).catch(function (err) {
                console.log(err);
            }).then(function () {
                resolve();
            });
    });
}
