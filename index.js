const table = document.querySelector("#table");
const addRowBtn = document.querySelector("#add-row");

let lastRow = 0;

function createRow(data) {
  let currentRowNumber;
  if (data !== null) {
    currentRowNumber = data.id;
    lastRow = currentRowNumber;
  } else {
    currentRowNumber = lastRow + 1;
    lastRow += 1;
  }

  let previousRow = table.querySelectorAll("tr")[currentRowNumber - 1];
  if (previousRow.querySelector(".username")) {
    if (previousRow.querySelector(".username").value === "") {
      lastRow -= 1;
      alert("Username can't be empty");
      return false;
    }
  }

  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");

  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let input3 = document.createElement("input");

  let saveBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let updateBtn = document.createElement("button");

  input1.classList.add("username");
  input2.classList.add("email");
  input3.classList.add("phone");

  saveBtn.innerText = "Save";
  saveBtn.classList.add("save-btn");
  saveBtn.addEventListener("click", () => saveData(currentRowNumber));

  editBtn.innerText = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.style.display = "none";
  editBtn.addEventListener("click", () => editData(currentRowNumber));

  updateBtn.innerText = "Update";
  updateBtn.classList.add("update-btn");
  updateBtn.style.display = "none";
  updateBtn.addEventListener("click", () => updateData(currentRowNumber));

  if (data !== null) {
    input1.value = data.name;
    input2.value = data.email;
    input3.value = data.phone;

    input1.disabled = true;
    input2.disabled = true;
    input3.disabled = true;

    saveBtn.style.display = "none";
    editBtn.style.display = "block";
  }

  td1.appendChild(input1);
  td2.appendChild(input2);
  td3.appendChild(input3);
  td4.appendChild(saveBtn);
  td4.appendChild(editBtn);
  td4.appendChild(updateBtn);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  table.appendChild(tr);
}

addRowBtn.addEventListener("click", () => createRow(null));

window.onload = () => {
  // FETCH THE DATA FROM SERVER
  fetch("http://localhost:7000")
    .then(res => res.json())
    .then(data => {
      let rowData = data.data;
      rowData.forEach(datum => {
        createRow(datum);
      });
    });
};

// FUNCTION TO SAVE DATA
function saveData(id) {
  let rows = document.querySelectorAll("table tr");
  let currentRow = rows[id];
  let username = currentRow.querySelector(".username");
  if (username.value === "") {
    alert("Username can't be empty");
    return false;
  }

  let name = currentRow.querySelector(".username");
  let email = currentRow.querySelector(".email");
  let phone = currentRow.querySelector(".phone");

  let dataToServer = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    id: currentRow.rowIndex
  };

  // SEND TO SERVER
  fetch("http://localhost:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToServer)
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        name.value = "";
        email.value = "";
        phone.value = "";
      }
    });

  // CHANGE THE BUTTONS
  currentRow.querySelector(".save-btn").style.display = "none";
  currentRow.querySelector(".edit-btn").style.display = "block";

  // CHANGE THE INPUT FIELD
  name.disabled = true;
  email.disabled = true;
  phone.disabled = true;
}

// FUNCTION TO UPDATE DATA
function updateData(id) {
  let rows = document.querySelectorAll("table tr");
  let currentRow = rows[id];
  let username = currentRow.querySelector(".username");
  if (username.value === "") {
    alert("Username can't be empty");
    return false;
  }

  let name = currentRow.querySelector(".username");
  let email = currentRow.querySelector(".email");
  let phone = currentRow.querySelector(".phone");

  let dataToServer = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    id: currentRow.rowIndex
  };

  // SEND TO SERVER
  fetch(`http://localhost:7000/${dataToServer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToServer)
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        name.value = "";
        email.value = "";
        phone.value = "";
      }
    });

  // CHANGE THE BUTTONS
  currentRow.querySelector(".save-btn").style.display = "none";
  currentRow.querySelector(".update-btn").style.display = "none";
  currentRow.querySelector(".edit-btn").style.display = "block";

  // CHANGE THE INPUT FIELD
  name.disabled = true;
  email.disabled = true;
  phone.disabled = true;
}

// FUNCTION TO EDIT DATA
function editData(id) {
  let rows = document.querySelectorAll("table tr");
  let currentRow = rows[id];

  let name = currentRow.querySelector(".username");
  let email = currentRow.querySelector(".email");
  let phone = currentRow.querySelector(".phone");

  name.disabled = false;
  email.disabled = false;
  phone.disabled = false;

  currentRow.querySelector(".save-btn").style.display = "none";
  currentRow.querySelector(".edit-btn").style.display = "none";
  currentRow.querySelector(".update-btn").style.display = "block";
}
