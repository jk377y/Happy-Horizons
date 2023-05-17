function createUser() {
    const firstName = document.getElementById("postNewUserFirstName").value;
    const lastName = document.getElementById("postNewUserLastName").value;
    const dob = document.getElementById("postNewUserDOB").value;
    const email = document.getElementById("postNewUserEmail").value;
    const password = document.getElementById("postNewUserPassword").value;
    const phone = document.getElementById("postNewUserPhone").value;
    const isAdmin = document.getElementById("postNewUserIsAdmin").value === "true";
    const user = { firstName, lastName, dob, email, password, phone, isAdmin };
    fetch("/navigate/admin/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/navigate/admin/users";
        } else {
            throw new Error("User creation failed. Please provide unique values for Phone and/or Email.");
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
        console.log("Catch block executed");
        alert(error.message);
    });
}