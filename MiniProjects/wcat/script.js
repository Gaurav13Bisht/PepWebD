#!/usr/bin/env node

// const fs = require('fs');

// fs.writeFileSync("abc.txt", "This is pepcoding");

// let data = fs.readFileSync("abc.txt", "utf-8");
// console.log(data);
// console.log(fs.existsSync(data));

// fs.writeFileSync("abc.txt", data + " I know it");   // fpr appending
// console.log(fs.readFileSync("abc.txt", "utf-8"));

let cmds = process.argv;       // It will give the arguments array given at the time of script run and By default first argument is node address and second is script address. From 2nd index the arguments given while running script will be there.
let rem = cmds.slice(2);       // slice will remove the array from 2nd index and will give it to rem.

const fs = require("fs");       // Initialising fs : FILESYSTEM

// for (let i = 0; i < rem.length; i++) {

//     let data = rem[i];
//     if (fs.existsSync(data)) {            // Return true if exists
//         let print = fs.readFileSync(data, "utf-8");
//         console.log(print);
//     }
//     else {
//         console.log(data + " does not exist");
//     }
// }



// THIS IS FOR NOT PRINTING OF EMPTY LINES IN FILES :
// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });

// for (let idx in files) {
//     let data = fs.readFileSync(files[idx], "utf-8");
//     if (options.includes("-s")) {
//         let lines = data.split("\r\n");
//         for(let i in lines){
//             if(lines[i] != "")
//                 console.log(lines[i]);
//         }
//     }
//     else
//         console.log(data);
// }





// THIS IS FOR NUMBERING OF LINES IN ALL FILES (H.W.):
let options = rem.filter(function (data) {
    if (data.startsWith("-"))
        return true;
});


let files = rem.filter(function (data) {
    if (!data.startsWith("-"))
        return true;
});

var num = 1;
for (let idx in files) {
    let data = fs.readFileSync(files[idx], "utf-8");
    if (options.includes("-n")) {
        if (options.includes("-s")) {
            let lines = data.split("\r\n");
            for (let i in lines) {
                if (lines[i] != "") {
                    console.log(num + "." + lines[i]);
                    num++;
                }
            }
        }
        else {
            let lines = data.split("\r\n");
            for (let i in lines) {
                console.log(num + "." + lines[i]);
                num++;
            }
        }

    }
    else {
        if (options.includes("-s")) {
            let lines = data.split("\r\n");
            for (let i in lines) {
                if (lines[i] != "")
                    console.log(lines[i]);
            }
        }
        else
            console.log(data);

    }
}
