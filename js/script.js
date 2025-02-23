
// CREATE AN ARRAY OF EMPLOYEES
var employees = [
    [11112345, "Zak", 1111, "1111@google.com", "Administrative"], 
    [22222345, "Jessica", 2222, "2222@google.com", "Engineering"], 
    [33332345, "Jack", 3333, "3333@google.com", "Engineering"], 
    [44442345, "Annie", 4444, "4444@google.com", "Marketing"], 
    [55552345, "Grace", 5555, "5555@google.com", "Marketing"]
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
function loadeEmployeesFromStorage() {
    var employeesJSON = localStorage.getItem("employees");
    if(employeesJSON) {
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
        employees = JSON.parse(employeesJSON);
    }
    buildGrid();
}



// GET DOM ELEMENTS
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
var form = $("addForm");
var empTable = $("empTable");
var empCount = $("empCount");
var storage;


// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

loadeEmployeesFromStorage()
//buildGrid();


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    var empId = Number($("id").value);
    var fulName = $("name").value;
    var extenDigit = Number($("extension").value);
    var email = $("email").value;
    var department = $("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var newEmployee = [empId, fulName, extenDigit, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    empCount.textContent = `Now the total number of employees is ${employees.length}`;

    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if(confirm("Are you sure to delete this employee?")) {

        var row = e.target.closest("tr");

         // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        var rowIndex = Array.from(row.parentNode.children).indexOf(row);

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex, 1);

        // BUILD THE GRID
        buildGrid();
    }

});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    var tbody = $("empTable").getElementsByTagName("tbody")[0];
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    tbody.innerHTML = "";

    // REBUILD THE TBODY FROM SCRATCH
    
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for (var employee of employees) {
        var row = document.createElement("tr");
        for (var itemData of employee) {
            var cellData = document.createElement("td");
            cellData.textContent= itemData;
            row.appendChild(cellData);
        }

        var cellDelete = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        cellDelete.appendChild(deleteButton);
        row.appendChild(cellDelete);

        // REBUILDING THE ROW STRUCTURE

        // BIND THE TBODY TO THE EMPLOYEE TABLE
        tbody.appendChild(row);

            // UPDATE EMPLOYEE COUNT
        empCount.textContent = `Now the total number of employees is ${employees.length}`;

        // STORE THE ARRAY IN STORAGE
        var employeesJSON = JSON.stringify(employees);
        localStorage.setItem("employees", employeesJSON);
     } 
};

