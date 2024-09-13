let userentries = document.getElementById("registrationForm");
const storedEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

userentries.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const checked = document.getElementById("checkbox").checked;

    const entry = {
        name,
        email,
        pass,
        dob,
        checked
    };
    storedEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(storedEntries));
    displayTable();  // Call the function to update the table
    userentries.reset();  // Clear the form
});

document.getElementById("dob").addEventListener('input', (event) => {
    event.preventDefault();

    // Calculating the user's age based on the input date of birth
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();

    function checkAge() {
        if (age < 18 || age > 55) {
            dob.setCustomValidity("Age should be between 18 to 55");
            dob.reportValidity();
        } else {
            dob.setCustomValidity('');
        }
    }
    checkAge();
});


// Function to display entries in the table
function displayTable() {
    const entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    const tableBody = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";  // Clear previous table entries

    entries.forEach((entry) => {
        const row = `<tr>
                        <td>${entry.name}</td>
                        <td>${entry.email}</td>
                        <td>${entry.pass}</td>
                        <td>${entry.dob}</td>
                        <td>${entry.checked ? "true" : "false"}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Display the table when the page loads
window.onload = displayTable;
