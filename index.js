function getAnUpdate() {
    console.log("Updating List...");
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let itemJsonArray = [];

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }

    update();
}

function update() {
    let itemJsonArray = [];

    if (localStorage.getItem('itemsJson') == null) {
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
        </tr>`;
    });

    tableBody.innerHTML = str;
}

function deleted(itemIndex) {
    console.log("Deleting item at index:", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1); // this actually removes the item
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// Event listener for Add button
let add = document.getElementById("add");
add.addEventListener("click", getAnUpdate);

// Load table initially
update();

// Clear List
function clearStorage(){
    if(confirm("Do you really want to clear list ?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update();
    }
}
