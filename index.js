let element = (id) => document.getElementById(id);

let user_entries = [];

function fillTable() {
    let obj = localStorage.getItem("user_entries");
    if (obj) {
        user_entries = JSON.parse(obj);
    } else {
        user_entries = [];
    }
    return user_entries;
}
user_entries = fillTable();

let username = element("name"),
    email = element("email"),
    password = element("password"),
    dob = element("dob"),
    tc = element("checkbox"); // Updated to match 'checkbox' id in HTML

let form = document.forms["myForm"];

function verify(elem, message, cnd) {
    if (cnd) {
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    } else {
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');
    }
}

function checkDOB() {
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    return !(age < 18 || age > 55);
}

let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "Your age must be between 18 and 55 to continue";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username, message_name, cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email, message_email, cond_email);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob, message_dob, cond_dob);
});

tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc, message_agree, cond_agree);
});

function makeObject() {
    return {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: tc.checked
    };
}

function displayTable() {
    let tableBody = element("userTable").getElementsByTagName('tbody')[0]; // Get tbody
    let entries = user_entries;
    let str = ``;
    for (let i = 0; i < entries.length; i++) {
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${'*'.repeat(entries[i].password.length)}</td> <!-- Mask password -->
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked ? 'Yes' : 'No'}</td> <!-- Yes/No for terms -->
                </tr>\n`;
    }
    tableBody.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        user_entries.push(obj);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    displayTable();
});

window.onload = (event) => {
    displayTable(); // Ensure table loads with user entries (if any)
};
