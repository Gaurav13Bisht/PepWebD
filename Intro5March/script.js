//                                                                                           5 MARCH 21

// let a = 10;
// let a = 20;
// console.log(a);

// var a = 10;
// var a = 20;
// console.log(a);

// const a = 10;
// const a = 20;
// console.log(a);

// let a = 10;
// a = 20;
// console.log(a);

// var b = 10;
// b = 20;
// console.log(b);

// const c = 10;
// c = 20;
// console.log(c);


// function temp() {
//     var a = 30;
//     {
//         let b = 40;

//     }
//     // console.log(b);
//     console.log(a);
// }
// temp()

// let a = 10;
// {
//     //let a = 20;
//     console.log(a);    // It will work because let a = 10 is global here.
//     //let a = 20; // it will give error because console.log is used in the same block so it will search in its block and will found let a = 20 but its value is given after console so it will give error.
//     {
//         let a = 30;
//         console.log(a);
//     }
// }

//ARRAYS :

//1
// let arr = [];
// arr.push(1);
// arr.push(2);
// arr[2] = 7;

// console.log(arr);
// arr.pop();
// console.log(arr);

//2
// let arr2 = [1, 2, 3, 4, 5, 6];
// console.log(arr2);

// arr2[50] = 32;

// console.log(arr2);

//3
// let arr3 = new Array(5);
// console.log(arr3);

// arr3[14] = 43;
// console.log(arr3);
// console.log(arr3[7]);

//4
// let arr4 = [2, 'g', 1.5, "dsd"];
// console.log(arr4);

//5
// let arr5 = new Array(1, 2, 3, 4, 5);
// console.log(arr5);

//6
// let arr6 = new Array(5);
// console.log(arr6.length);

//7
// let arr7 = new Array('g');     // This will become an element of arr7 not size.
// console.log(arr7);

// LOOPS :

// for (let i = 0; i < arr5.length; i++) {
//     console.log(arr5[i]);
// }

// let a = 8, b = 9;
// console.log(a,b);

// TRICKYYYYYYY
// for(let k = 0; k < 2; k++){
//     for(let k = 3; k < 5; k++){
//         console.log(k);
//     }
// }

// INFINITE LOOP PLS DONT RUN
// for(let k = 0; k < 7; k++){
//     for(k = 4; k < 5; k++){
//         console.log(k);
//     }
// }
// let arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18);
// for(i in arr){
//     console.log(i);   // INDEXES
// }

// arr.forEach(function(data, index){
//     console.log(data, index);     // value and Index
// });

// function print(data, index){
//     console.log(data, index);
// }

// arr.forEach(print);


// function changer(data, index){
//     console.log(data, index);
// }

// arr.map(changer);

// function changer2(data, index){
//     return data + 2;
// }

// OR 

// arr = arr.map(function(data,index) {
//     return data + 2;
// });
// arr = arr.map(changer2);

// console.log(arr);

// delete arr[2];          // Length will remain same and <1 empty item will be placed> and it will be undefined
// console.log(arr.length);
// console.log(arr);
// console.log(arr[2]);

// arr.splice(1, 1);       // First idx is the removing index and second idx is the no. of element in row to be deleted
// console.log(arr);

// arr.splice(2);       // If only one idx is given then it wil remove all the elements in array after idx
// console.log(arr);

// QUESTION : Remove even elements from array.

// arr.forEach(function (data, index) {
//     if (data % 2 == 0) {
//         arr.splice(index, 1);         // changing index or data here will not result in any change in arr.
//     }
// });

// console.log(arr);                Will only work for small amount of elements.


// arr = arr.filter(function (data, index) {    // by default false will return
//     if (data % 2 == 0) {
//         return false;
//     }
//     else
//         return true;
// });

// console.log(arr);

//                                                                                            6 MARCH 21

//                            OBJECT    : Almost everything in JavaScript is an Object.

// let obj = {
//     "Hello": "How are you",
//     "fine": [1, 2, 3, 4, 5],
//     "function": function () { console.log(1234) },
//     1: 435,
//     2: {
//         "Hi": "Good & mst"
//     },
//     // "1" : 321       // This will override the previous 1 key.
// }

// obj[-1] = "Negative";   // To add a Key outside the object.

// console.log(obj.fine);
// console.log(obj[2]["Hi"]);
// console.log(obj[1]);            // Integer Key are only accessible with [] not . 

// console.log(Object.keys(obj));
// console.log(Object.values(obj));

// IMPORTANT : If an Object's all keys are integer than it acts as an Array or is an Array.

// Proof that Array is also object
// let arr8 = [1, 2, 3, 4];
// arr8["abc"] = "Hello";   // This will work, but this is a property of Object therefore Array is also an Object.
// console.log(Object.keys(arr8));
// console.log(arr8);

