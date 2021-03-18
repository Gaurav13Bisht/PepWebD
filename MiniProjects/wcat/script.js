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


// READING :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// THIS IS FOR NOT PRINTING OF EMPTY LINES IN FILES AKA "-s" :
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





// THIS IS FOR NUMBERING OF LINES IN ALL FILES AKA "-n" and "-s" support to (H.W.):
// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });

// var num = 1;
// for (let idx in files) {
//     let data = fs.readFileSync(files[idx], "utf-8");
//     if (options.includes("-n")) {
//         if (options.includes("-s")) {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "") {
//                     console.log(num + "." + lines[i]);
//                     num++;
//                 }
//             }
//         }
//         else {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 console.log(num + "." + lines[i]);
//                 num++;
//             }
//         }

//     }
//     else {
//         if (options.includes("-s")) {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "")
//                     console.log(lines[i]);
//             }
//         }
//         else
//             console.log(data);

//     }
// }

// // THIS IS FOR NUMBERING OF only non empty LINES IN ALL FILES AKA "-b" and "-n" support:
// If both -b and -n comes then priority will be given to the first occuring command.

// -b will result in numbering of lines but not numbering blank lines and also wont remove the blank lines.

// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });

// var num = 1;
// for (let idx in files) {
//     let data = fs.readFileSync(files[idx], "utf-8");
//     if ((options.includes("-n") && !options.includes("-b")) || (options.includes("-b") && options.includes("-n") && options.indexOf("-n") < options.indexOf("-b"))) {
//         if (options.includes("-s")) {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "") {
//                     console.log(num + "." + lines[i]);
//                     num++;
//                 }
//             }
//         }
//         else {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 console.log(num + "." + lines[i]);
//                 num++;
//             }
//         }

//     }
//     else if (options.includes("-b")) {
//         if (options.includes("-s")) {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "") {
//                     console.log(num + "." + lines[i]);
//                     num++;
//                 }
//             }
//         }
//         else {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "") {
//                     console.log(num + "." + lines[i]);
//                     num++;
//                 }
//                 else
//                     console.log(lines[i]);
//             }
//         }
//     }
//     else {
//         if (options.includes("-s")) {
//             let lines = data.split("\r\n");
//             for (let i in lines) {
//                 if (lines[i] != "")
//                     console.log(lines[i]);
//             }
//         }
//         else
//             console.log(data);

//     }
// }



// WRITING ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Replacing text with "-w" :

// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });

// if(options.length != 1 || files.length != 2 || rem.indexOf("-w") != 1){
//     console.log("Cannot Process !!!!!!!!!!!");
//     return;
// }

// let data = fs.readFileSync(files[0], "utf-8");
// fs.writeFileSync(files[1], data);
// console.log(fs.readFileSync(files[1], "utf-8"));



// Appending into file with "-a" :

// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });

// if (options.length != 1 || files.length != 2 || rem.indexOf("-a") != 1) {
//     console.log("Cannot Process !!!!!!!!!!!");
//     return;
// }

// let data1 = fs.readFileSync(files[0], "utf-8");
// let data2 = fs.readFileSync(files[1], "utf-8");
// fs.writeFileSync(files[1], data2 + "\n" + data1);
// console.log(fs.readFileSync(files[1], "utf-8"));


// Combining -w and -s (wcat abc.txt -ws abc2.txt):

// let options = rem.filter(function (data) {
//     if (data.startsWith("-"))
//         return true;
// });


// let files = rem.filter(function (data) {
//     if (!data.startsWith("-"))
//         return true;
// });


// if (options.length != 1 || files.length != 2 || rem.indexOf("-ws") != 1) {
//     console.log("Cannot Process !!!!!!!!!!!");
//     return;
// }

// fs.writeFileSync("temp.txt", "");

// let data = fs.readFileSync(files[0], "utf-8");
// let lines = data.split("\r\n");
// for (let i in lines) {
//     if (lines[i] != "") {
//         let data1 = fs.readFileSync("temp.txt", "utf-8");
//         if (i != lines.length - 1)
//             fs.writeFileSync("temp.txt", data1 + lines[i] + "\r\n");
//         else
//             fs.writeFileSync("temp.txt", data1 + lines[i]);
//     }

// }
// let datat = fs.readFileSync("temp.txt", "utf-8");
// fs.writeFileSync(files[1], datat);
// console.log(fs.readFileSync(files[1], "utf-8"));

    
    if (rem.length > 1) {
        console.log("Cannot Process !!!!!!!!!!!");
        return;
    }
    
    var count = 0;
    let data = fs.readFileSync(rem[0], "utf-8");
    let lines = data.split("\r\n");
    for (let i in lines) {
        let line = lines[i];
        for(let k in line){
            if(line[k] == 'n')
                count++;
        }
    
    }
    console.log(count);
    
    