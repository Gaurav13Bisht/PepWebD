let obj = [
    { name: "Delhi", rainfall: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7], },
    { name: "Noida", rainfall: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
    { name: "Dehradun", rainfall: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
    { name: "Nanital", rainfall: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] }
]
for (let i = 0; i < obj.length; i++) {
    var avg = 0;
    for (let j = 0; j < obj[i]["rainfall"].length; j++) {
        avg += obj[i]["rainfall"][j];
    }
    avg = avg / obj[i]["rainfall"].length;
    // obj[i]["rainfall"].splice(0);
    // obj[i]["rainfall"].push(avg);
    // or
    delete obj[i]["rainfall"];
    obj[i]["rainfall"] = avg;
}

console.log(obj);