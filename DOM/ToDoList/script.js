let input = document.querySelector(".task-input");
let ol = document.querySelector(".ordered-lists");
//OR
// let ol = document.querySelector(".list-container");

let alreadyLi = document.querySelectorAll(".ordered-lists li");
for (let i = 0; i < alreadyLi.length; i++) {
    alreadyLi[i].addEventListener("dblclick", taskDeleter);
}

function taskDeleter(e) {
    e.currentTarget.remove();
}

input.addEventListener("keypress", function (e) {
    if (e.key == 'Enter') {
        let task = input.value;
        if (task == "") {
            alert("Task cannot be empty !!");
            return;
        }
        input.value = "";
        let li = document.createElement('li');
        li.innerText = task;
        li.classList.add("task-list");
        li.addEventListener("dblclick", taskDeleter);
        ol.appendChild(li); // This will add the new task below the already existing task.
        // ul.insertBefore(li, ul.firstChild); // This will add the new task above the already existing task.
    }
});