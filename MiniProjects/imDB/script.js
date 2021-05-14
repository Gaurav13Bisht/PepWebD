const pup = require("puppeteer");

// Use your ID and PASSWORD
let id = "";
let pwd = "";
//  Action = 0
// Adventure = 1
// Animation = 2
// Biography = 3
// Comedy = 4
// Crime 5
// Drama 6 
// Family 7
// Fantasy 8
// Film-Noir 9
// History 10
// Horror 11
// Music 12
// Musical 13
// Mystery 14 
// Romance 15
// Sci-Fi 16
// Sport 17
// Thriller 18 
// War 19
// Western 20
let goodcom = "Loved it !!";
let badcom = "You could do way better !";

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
    let pageOpenPromise = tab.goto("https://www.imdb.com/chart/top/");
    return pageOpenPromise;
}).then(function () {
    let waitPromise = tab.waitForSelector(".subnav_item_main a", { visible: true });
    return waitPromise;
}).then(function () {
    let options = tab.$$(".subnav_item_main a");
    return options;
}).then(function (data) {
    let urls = [];
    for (let i = 0; i < data.length; i++) {
        let urlFetchPromise = tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, data[i]);
        urls.push(urlFetchPromise);
    }
    return Promise.all(urls);
}).then(function(data){
    console.log(data[0]);
})
.catch(function (err) {
    console.log(err);
});
//     console.log(options);
    // }).then(function () {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(() => {
    //             resolve();
    //         }, 5000);
    //     })
    // }).then(function () {
    //     let pageOpenPromise = tab.goto("https://www.youtube.com/");
    //     return pageOpenPromise;
    // }).then(function () {
    //     let waitPromise = tab.waitForSelector("a[title='Explore']", { visible: true });
    //     return waitPromise;
    // }).then(function () {
    //     let clickPromise = tab.click("a[title='Explore']");
    //     return clickPromise;
    // }).then(function () {
    //     let sectionPromise = tab.waitForSelector("#destination-content-root", { visible: true });
    //     return sectionPromise;
    // }).then(function () {
    //     let getPromise = tab.$$("#destination-content-root");
    //     return getPromise;
    // }).then(function (data) {
    //     let urlFetchPromise = tab.evaluate(function (ele) {
    //         return ele.getAttribute("href");
    //     }, data[0]);
    //     return urlFetchPromise;
    // })// 
    //     .then(function (data) {
    //         let clickTrending = tab.goto("https://www.youtube.com/" + data);
    //         return clickTrending;
    //     })
    //     // .then(function(){
    //     //     let vidPromise = tab.waitForSelector(".text-wrapper.style-scope.ytd-video-renderer", {visible : true});
    //     //     return vidPromise;
    //     // })
    //     // .then(function(){
    //     //     let videoPromise = tab.$$(".text-wrapper.style-scope.ytd-video-renderer");
    //     //     return videoPromise;
    //     // })
    //     .then(function () {
    //         let vidPromise = tab.waitForSelector("div[id='title-wrapper']", { visible: true });
    //         return vidPromise;
    //     })
    //     .then(function () {
    //         let playPromise = tab.$$("a[id='video-title']");
    //         return playPromise;

    //     }).then(function (data) {
    //         let urlFetchPromises = [];
    //         for (let i in data) {
    //             if (i >= 3 && i <= 8)
    //                 continue;
    //             if (i == 12)
    //                 break;

    //             let urlFetchPromise = tab.evaluate(function (ele) {
    //                 return ele.getAttribute("href");
    //             }, data[i]);
    //             urlFetchPromises.push(urlFetchPromise);
    //         }
    //         return Promise.all(urlFetchPromises);
    //     }).then(function (data) {
    //         let problemSolvedPromise = DisOrlikeComment("https://www.youtube.com" + data[0]);
    //         for (let i = 1; i < data.length; i++) {
    //             problemSolvedPromise = problemSolvedPromise.then(function () {
    //                 return DisOrlikeComment("https://www.youtube.com" + data[i]);
    //             });
    //         }
// }).catch(function (err) {
//     console.log(err);
// });
// //////////////////////////////////////////////////////////////////////////////


// function DisOrlikeComment(url) {
//     return new Promise(function (resolve, reject) {
//         tab.goto(url)
//             .then(function () {
//                 // LIKE
//                 let likeSelectorPromise = tab.waitForSelector("path[d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z']", { visible: true });
//                 return likeSelectorPromise;

//                 // DISLIKE
//                 //let likeDislikePromise = tab.waitForSelector("path[d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z']", { visible: true });
//                 // return likeDislikePromise;
//             })
//             .then(function () {
//                 // LIKE
//                 let likedPromise = tab.click("path[d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z']");
//                 return likedPromise;
//                 // DISLIKE
//                 //let dislikedPromise = tab.click("path[d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z']");
//                 // return dislikedPromise;
//             }).then(function () {
//                 let commentBoxPromise = tab.waitForSelector("div[id='placeholder-area']", { visible: true });
//                 return commentBoxPromise;
//             })
//             .then(function () {
//                 let clickCommentBox = tab.click("div[id='placeholder-area']");
//                 return clickCommentBox;
//             }).then(function () {
//                 // GOOD COMMENT
//                 let typedComment = tab.type("div[id='placeholder-area']", goodcom);
//                 return typedComment;
//                 // BAD COMMENT :
//                 // let typedComment = tab.type("div[id='placeholder-area']", badcom);
//                 // return typedComment;
//             }).then(function () {
//                 let clickCommentFind = tab.waitForSelector(".style-scope.ytd-button-renderer.style-primary.size-default", { visible: true });
//                 return clickCommentFind;
//             }).then(function () {
//                 let clickCommentBox = tab.click(".style-scope.ytd-button-renderer.style-primary.size-default");
//                 return clickCommentBox;
//             }).then(function () {
//                 return new Promise(function (resolve, reject) {
//                     setTimeout(() => {
//                         resolve();
//                     }, 4000);
//                 })
//             }).then(function () {
//                 resolve();
//             });
//     });
// }
