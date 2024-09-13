// Getting the form element by its ID
let userentries = document.getElementById("registrationForm");

// Retrieving existing user entries from localStorage or initializing an empty array
const a = JSON.parse(localStorage.getItem("user-entries")) || [];

// Handling form submission and storing the entries
userentries.addEventListener("submit", (event) => {
    event.preventDefault();

    // Getting form field values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const checked = document.getElementById("terms").checked;

    // Creating a new entry object
    const entry = {
        name,
        email,
        pass,
        dob,
        checked
    };

    // Adding the new entry to the array and saving to localStorage
    a.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(a));

    // Reloading the page to show the new entry in the table
    window.location.reload();
});

// Retrieving stored entries from localStorage to display in the table
const b = JSON.parse(localStorage.getItem("user-entries")) || [];

// Mapping through each stored entry and appending it to the table
b.map((be) => {
    document.getElementById("w1").innerHTML += `
        <tr>
            <td class="px-4 py-2 border-b">${be.name}</td>
            <td class="px-4 py-2 border-b">${be.email}</td>
            <td class="px-4 py-2 border-b">${be.pass}</td>
            <td class="px-4 py-2 border-b">${be.dob}</td>
            <td class="px-4 py-2 border-b">${be.checked ? 'Yes' : 'No'}</td>
        </tr>`;
});

// Date of Birth validation logic (age must be between 18 and 55)
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

// Email validation logic
document.getElementById("email").addEventListener('input', (event) => {
    event.preventDefault();

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for validating email
        return emailPattern.test(email);
    }

    // Checking if the email is valid and setting appropriate validity messages
    function checkEmail(ev) {
        if (!isValidEmail(ev)) {
            email.setCustomValidity(`Email ${email.value} is not in the right format`);
            email.reportValidity();
        } else {
            email.setCustomValidity('');
        }
    }
    checkEmail(email.value);
});
