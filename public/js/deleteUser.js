function deleteUser() {
    const userID = document.getElementById("deleteUserID").value;
    fetch(`/navigate/admin/users/${userID}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/navigate/admin/users";
        } else {
            alert("Failed to delete user. Please try again.");
        }
    })
    .catch(error => {
        console.error(error);
        alert("An error occurred while deleting the user. Please try again.");
    });
}