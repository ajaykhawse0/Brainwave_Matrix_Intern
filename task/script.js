const inputbox = document.getElementById("inputbx");
const listcontainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-level");

function addtask() {
    if (inputbox.value === '') {
        alert("Must write Something");
    } else {
        let li = document.createElement("li");

      
        const priority = prioritySelect.value;

      
        li.innerHTML = inputbox.value;

       
        li.classList.add(priority);

     
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

  
        listcontainer.appendChild(li);

  
        inputbox.value = '';
        

        saveData();
    }
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();  
    }
}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showList() {
    listcontainer.innerHTML = localStorage.getItem("data");
}

showList();
