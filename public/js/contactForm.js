sendEmail = () => {
	var contactName = document.getElementById("contactName");
	var contactEmail = document.getElementById("contactEmail");
	var contactMessage = document.getElementById("contactMessage");
	if (contactName.value === "" || contactEmail.value === "" || contactMessage.value === "") {
		alert("Please fill in all fields!");
		return false;
	} else {
		emailjs.send("service_k6f7ati", "template_aalizyq", {
			contactName: contactName.value,
			contactEmail: contactEmail.value,
			contactMessage: contactMessage.value,
		})
			.then(() => {
				alert("Your message has been sent!");
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Failed to send email:", error);
				alert("Failed to send email.");
			});
	}
};