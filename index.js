function ageValidate() {
    let dob = document.forms["myForm"]["dob"].value;
    if (dob) {
        let birthDate = new Date(dob);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Check if the age is between 18 and 55
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55.");
            return false;
        }
    } else {
        alert("Please enter your date of birth.");
        return false;
    }
    return true;
}


